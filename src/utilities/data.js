import jsonpath from 'jsonpath'

import {getType, getDefaultForType} from './index'
import {join} from './path'

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
      prop.push(getDefaultForType(getType(schema.items)))
    } else if (schema.additionalProperties) {
      prop['bella'] = getDefaultForType(getType(schema.additionalProperties))
    }
    return prop
  })
  return data
}

export const removeItem = (data, keys) => {
  const key = keys.pop()
  jsonpath.apply(data, `$.data.${join(keys)}`, prop => {
    delete prop[key]
    return prop
  })
  return data
}
