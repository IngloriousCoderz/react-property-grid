import uuid from 'uuid'
import jsonpath from 'jsonpath'

import {clone, inferType, getType, defaults} from './index'
import {join} from './path'

export const INTERNAL_ID = '__id'

export const importData = data => {
  const importedData = clone(data)
  jsonpath.apply(importedData, '$..*', value => {
    if (inferType(value) === 'object') {
      value[INTERNAL_ID] = uuid.v4()
    }
    return value
  })
  return importedData
}

export const exportData = data => {
  const exportedData = clone(data)
  jsonpath.apply(exportedData, '$..*', value => {
    delete value[INTERNAL_ID]
    return value
  })
  return exportedData
}

export const setKey = (data, keys, newKey) => {
  const oldKey = keys.pop()
  jsonpath.apply(data, `$.data.${join(keys)}`, prop => {
    return Object.assign({}, ...Object.keys(prop).map(key => {
      if (key === oldKey) {
        return {[newKey]: prop[key]}
      }
      return {[key]: prop[key]}
    }))
  })
  return data
}

export const setValue = (data, keys, value) => {
  const key = keys.pop()
  jsonpath.apply(data, `$.data.${join(keys)}`, prop => {
    prop[key] = value
    return prop
  })
  return data
}

export const addItem = (data, keys, schema) => {
  jsonpath.apply(data, `$.data.${join(keys)}`, prop => {
    const type = getType(schema)
    if (type === 'array' && schema.additionalItems !== false) {
      prop.push(defaults(schema.items))
    } else if (schema.additionalProperties) {
      const index = Object.keys(prop).length + 1
      prop[`${schema.additionalProperties.title}${index}`] = defaults(schema.additionalProperties)
    }
    return prop
  })
  return data
}

export const removeItem = (data, keys) => {
  const key = keys.pop()
  jsonpath.apply(data, `$.data.${join(keys)}`, prop => {
    if (Array.isArray(prop)) {
      prop.splice(key, 1)
    } else {
      delete prop[key]
    }
    return prop
  })
  return data
}