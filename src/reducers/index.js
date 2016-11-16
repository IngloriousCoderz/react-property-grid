import deref from 'json-schema-deref-local'

import * as types from '../constants/actionTypes'
import {defaults} from '../utilities/schema'
import {importData, setKey, setValue, addItem, removeItem} from '../utilities/data'

const data = (state, action) => {
  const {type, payload} = action
  switch (type) {
    case types.SET_DEFAULTS:
      return setValue(state, payload.path, defaults(payload.schema))
    case types.SET_KEY:
      return setKey(state, payload.path, payload.key)
    case types.SET_VALUE:
      return setValue(state, payload.path, payload.value)
    case types.ADD_ITEM:
      return addItem(state, payload.path, payload.schema)
    case types.REMOVE_ITEM:
      return removeItem(state, payload.path)
    default:
      return state
  }
}

export default (state, action) => {
  const {type, payload} = action
  switch (type) {
    case types.INIT:
    return {
      rootSchema: deref(payload.schema),
      data: importData(payload.data)
    }
    case types.SET_DEFAULTS:
      return {
        ...state,
        data: data(state.data, action)
      }
    case types.SET_KEY:
    case types.SET_VALUE:
    case types.ADD_ITEM:
    case types.REMOVE_ITEM:
      return {
        ...state,
        dirty: true,
        data: data(state.data, action)
      }
    case types.SYNC:
      const {dirty, ...rest} = state // eslint-disable-line no-unused-vars
      return rest
    default:
      return state
  }
}
