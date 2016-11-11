import uuid from 'uuid'
import tv4 from 'tv4'

import {INTERNAL_ID, getDefaultForType, exportData} from './data'

export const getType = schema => {
  if (schema.type == null) {
    return schema.enum != null ? 'enum' : 'object'
  }
  if (schema.type === 'object') {
    return 'object'
  }
  if (schema.type === 'array') {
    return 'array'
  }

  return schema.type
}

export const matchSchema = (schemas, data) => schemas.filter(schema => tv4.validate(exportData(data), schema))[0]

/* borrowed by https://github.com/chute/json-schema-defaults */
export const defaults = schema => {
  const type = getType(schema)

  if (schema['default'] != null) {
    return schema['default']
  }

  if (schema.allOf != null) {
    return defaults(schema.allOf)
  }

  if (schema.anyOf != null) {
    return defaults(schema.anyOf[0])
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
    if (!schema.items) {
      return []
    }

    const minItems = schema.minItems || 0

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

    // object-typed arrays
    const value = defaults(schema.items)
    if (value == null) {
      return []
    }

    return Array(Math.max(1, minItems)).fill(value)
  }

  return getDefaultForType(type)
}
