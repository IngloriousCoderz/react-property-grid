import jsonpath from 'jsonpath'

import * as types from '../constants/actionTypes'
import {clone} from '../utilities'
import {split, join} from '../utilities/path'

const setKey = (state, keys, key) => {
  return state
}

const setValue = (state, keys, value) => {
  const key = keys.pop()

  jsonpath.apply(state, `$.data.${join(keys)}`, prop => {
    prop[key] = value
    return prop
  })
  return state
}

const data = (state, action) => {
  const {type, payload} = action
  switch (type) {
    case types.SET_KEY:
      return setKey(clone(state), split(payload.path), payload.key)
    case types.SET_VALUE:
      return setValue(clone(state), split(payload.path), payload.value)
    default:
      return state
  }
}

export default (state, action) => {
  const {type} = action
  switch (type) {
    case types.SET_KEY:
    case types.SET_VALUE:
      return data(state, action)
    default:
      return state
  }
}
