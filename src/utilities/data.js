import uuid from 'uuid'
import jp from 'jsonpath-lite'

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
  if (inferType(data) !== 'object') {
    return data
  }

  let newData = clone(data)

  const _importData = data => {
    if (inferType(data) === 'object') {
      data[INTERNAL_ID] = uuid.v4()
    }
    return data
  }

  newData = _importData(newData)
  jp.apply(newData, ALL, value => _importData(value))
  return newData
}

export const cleanup = data => {
  if (inferType(data) !== 'object') {
    return data
  }

  let newData = clone(data)

  const _cleanup = data => {
    if (inferType(data) === 'object') {
      delete data[INTERNAL_ID]
    }
    return data
  }

  newData = _cleanup(newData)
  jp.apply(newData, ALL, value => _cleanup(value))
  return newData
}

export const setKey = (data, path, newKey) => {
  const newData = clone(data)
  const oldKey = last(path)
  const parentPath = parent(path)

  const _setKey = (data, newKey) => {
    return Object.assign({}, ...Object.keys(data).map(key => {
      if (key === oldKey) {
        return {[newKey]: data[key]}
      }
      return {[key]: data[key]}
    }))
  }

  if (parentPath === '$') {
    return _setKey(newData, newKey)
  }

  jp.apply(newData, parentPath, prop => _setKey(prop, newKey))
  return newData
}

export const setValue = (data, path, value) => {
  const newData = clone(data)
  const key = last(path)
  const parentPath = parent(path)

  const _setValue = (data, key, value) => {
    data[key] = value
    return data
  }

  if (parentPath === '$') {
    return _setValue(newData, key, value)
  }

  jp.apply(newData, parentPath, prop => _setValue(prop, key, value))
  return newData
}

export const addItem = (data, path, schema) => {
  const newData = clone(data)
  const type = getType(schema)

  const _addItem = (data, schema) => {
    if (type === 'array' && schema.additionalItems !== false) {
      data.push(defaults(schema.items))
    } else if (schema.additionalProperties) {
      const index = Object.keys(cleanup(data)).length + 1
      data[`${schema.additionalProperties.title}${index}`] = defaults(schema.additionalProperties)
    }
    return data
  }

  if (path === '$') {
    return _addItem(newData, schema)
  }

  jp.apply(newData, path, prop => _addItem(prop, schema))
  return newData
}

export const removeItem = (data, path) => {
  const newData = clone(data)
  const key = last(path)
  const parentPath = parent(path)

  const _removeItem = (data, key) => {
    if (Array.isArray(data)) {
      data.splice(key, 1)
    } else {
      delete data[key]
    }
    return data
  }

  if (parentPath === '$') {
    return _removeItem(newData, key)
  }

  jp.apply(newData, parentPath, prop => _removeItem(prop, key))
  return newData
}

export const splitProperties = (data, schema) => {
  const properties = {}
  const additionalProperties = {}
  Object.keys(data).forEach(key => {
    if (schema.properties != null && Object.keys(schema.properties).includes(key)) {
      properties[key] = data[key]
    } else {
      additionalProperties[key] = data[key]
    }
  })

  return {properties, additionalProperties}
}
