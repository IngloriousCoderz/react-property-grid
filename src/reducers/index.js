import jsonpath from 'jsonpath'

import * as types from '../constants/actionTypes'
import {clone} from '../utilities'
import {split, join} from '../utilities/path'

const data = (state, action) => {
  const {payload} = action
  const {path, data} = payload

  const newState = clone(state)

  const fields = split(path)
  const field = fields.pop()

  jsonpath.apply(newState, `$.data.${join(fields)}`, value => {
    value[field] = data
    return value
  })
  return newState
}

export default (state, action) => {
  const {type} = action
  switch (type) {
    case types.SET_DATA:
      return data(state, action)
    default:
      return state
  }
}
