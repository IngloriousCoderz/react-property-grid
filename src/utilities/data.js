import uuid from 'uuid'
import jp from 'jsonpath'

import {getType, defaults} from './schema'
import {ALL, last, parent} from './path'

export const INTERNAL_ID = '__id'

const clone = json => JSON.parse(JSON.stringify(json))

/* http://arcturo.github.io/library/coffeescript/07_the_bad_parts.html */
const classToType = {}
'Boolean Number String Function Array Date RegExp Undefined Null'.split(' ').forEach(name => {
  classToType[`[object ${name}]`] = name.toLowerCase()
})

export const inferType = data => {
  const strType = Object.prototype.toString.call(data)
  return classToType[strType] || 'object'
}

const isPrimitive = data => {
  const type = inferType(data)
  return 'boolean number string date regexp undefined null'.split(' ').includes(type)
}

export const getDefaultForType = type => {
  return {
    boolean: false,
    integer: 0,
    number: 0,
    string: '',
    function: function() {},
    object: {},
    array: [],
    date: new Date(),
    regexp: /.*/,
    undefined: undefined,
    null: null
  }[type]
}

export const importData = data => {
  const newData = clone(data)
  jp.apply(newData, ALL, value => {
    if (inferType(value) === 'object') {
      value[INTERNAL_ID] = uuid.v4()
    }
    return value
  })
  return newData
}

export const exportData = data => {
  const newData = clone(data)
  if (isPrimitive(newData)) {
    return newData
  }

  jp.apply(newData, ALL, value => {
    delete value[INTERNAL_ID]
    return value
  })
  if (newData[INTERNAL_ID] != null) {
    delete newData[INTERNAL_ID]
  }
  return newData
}

export const setKey = (data, path, newKey) => {
  const newData = clone(data)
  const oldKey = last(path)
  jp.apply(newData, parent(path), prop => {
    return Object.assign({}, ...Object.keys(prop).map(key => {
      if (key === oldKey) {
        return {[newKey]: prop[key]}
      }
      return {[key]: prop[key]}
    }))
  })
  return newData
}

export const setValue = (data, path, value) => {
  const newData = clone(data)
  const key = last(path)
  jp.apply(newData, parent(path), prop => {
    prop[key] = value
    return prop
  })
  return newData
}

export const addItem = (data, path, schema) => {
  const newData = clone(data)
  const type = getType(schema)
  jp.apply(newData, path, prop => {
    if (type === 'array' && schema.additionalItems !== false) {
      prop.push(defaults(schema.items))
    } else if (schema.additionalProperties) {
      const index = Object.keys(exportData(prop)).length + 1
      prop[`${schema.additionalProperties.title}${index}`] = defaults(schema.additionalProperties)
    }
    return prop
  })
  return newData
}

export const removeItem = (data, path) => {
  const newData = clone(data)
  const key = last(path)
  const parentPath = parent(path)

  if (parentPath === '$') {
    delete newData[key]
    return newData
  }

  jp.apply(newData, parentPath, prop => {
    if (Array.isArray(prop)) {
      prop.splice(key, 1)
    } else {
      delete prop[key]
    }
    return prop
  })
  return newData
}
