import jsonpath from 'jsonpath'

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
