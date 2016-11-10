import {last} from './path'

const classToType = {}
"Boolean Number String Function Array Date RegExp Undefined Null".split(" ").forEach(name => {
  classToType["[object " + name + "]"] = name.toLowerCase()
})

export const clone = json => JSON.parse(JSON.stringify(json))

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

/* http://arcturo.github.io/library/coffeescript/07_the_bad_parts.html */
export const inferType = data => {
  const strType = Object.prototype.toString.call(data)
  return classToType[strType] || "object"
}

export const getDefaultForType = type => {
  return {
    string: '',
    number: 0,
    "null": null,
    object: {},
    integer: 0,
    boolean: false,
    array: []
  }[type]
}

export const isRequired = (path, requireds) => requireds != null && requireds.includes(last(path))

export const matchSchema = (schemas, data, rootSchema) => {
  const type = inferType(data)
  const selectedSchemas = schemas.filter(schema => {
    if (data.type == null) {
      return schema.type === type
    }
    return schema.properties.type.enum.includes(data.type)
  })
  return selectedSchemas[0]
}

export const defaults = schema => {
  const type = getType(schema)

  if (schema['default'] != null) {
    return schema['default']
  }

  if (schema.allOf != null) {
    return defaults(schema.allOf)
  }

  if (type === 'object') {
    return Object.keys(schema.properties || {}).reduce((values, key) => {
      const value = defaults(schema.properties[key])
      if (value != null) {
        values[key] = value
      }
      return values
    }, {})
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
    // const values = []
    // for (let i = 0; i < Math.max(1, minItems); i++) {
    //   values.push(value)
    // }
    // return values
  }
  return getDefaultForType(type)
}
