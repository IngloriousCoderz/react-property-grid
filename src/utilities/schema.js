import uuid from 'uuid'
import tv4 from 'tv4'
import {recursive} from 'merge'

import {INTERNAL_ID, INTERNAL_ANY_OF, getDefaultForType, cleanup} from './data'

export const getType = schema => {
  if (schema.enum != null) {
    return 'enum'
  }

  if (schema.type != null) {
    return schema.type
  }

  return 'object'
}

export const match = (schemas, data) => {
  const cleanData = cleanup(data)
  return schemas.filter(schema => tv4.validate(cleanData, schema))[0]
}

export const merge = schemas => recursive(true, ...schemas)

export const needsChoice = (schema) => {
  const type = getType(schema)
  if (type === 'array') {
    return schema.items.anyOf != null
  }
  if (type === 'object') {
    return schema.additionalProperties && schema.additionalProperties.anyOf != null
  }
  return false
}

/* borrowed by https://github.com/chute/json-schema-defaults */
export const defaults = (schema, choice) => {
  const type = getType(schema)

  if (schema.default != null) {
    return schema.default
  }

  if (schema.minimum != null) {
    return schema.minimum + (schema.exclusiveMinimum ? 1 : 0)
  }

  if (schema.allOf != null) {
    return defaults(merge(schema.allOf))
  }

  if (schema.anyOf != null) {
    return choice != null ? defaults(schema.anyOf[choice]) : INTERNAL_ANY_OF
  }

  if (type === 'object') {
    const value = Object.keys(schema.properties || {}).reduce((values, key) => {
      const value = defaults(schema.properties[key])
      if (value != null) {
        values[key] = value
      }
      return values
    }, {})
    value[INTERNAL_ID] = uuid.v4()
    return value
  }

  if (type === 'array') {
    const minItems = schema.minItems || 0

    if (!schema.items || minItems === 0) {
      return []
    }

    // object-typed arrays
    const value = defaults(schema.items)
    if (value == null) {
      return []
    }

    // tuple-typed arrays
    if (Array.isArray(schema.items)) {
      const values = schema.items.map(function(item) {
        return defaults(item)
      })

      // remove undefined items at the end (unless required by minItems)
      for (let i = values.length - 1; i >= 0; i--) {
        if (values[i] != null) {
          break
        }
        if (i + 1 > minItems) {
          values.pop()
        }
      }

      return values
    }

    return Array(minItems).fill(value)
  }

  return getDefaultForType(type)
}
