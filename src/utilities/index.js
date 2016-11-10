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
