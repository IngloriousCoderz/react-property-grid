import deref from 'json-schema-deref-local'

import * as types from '../constants/actionTypes'
import {defaults, needsChoice} from '../utilities/schema'
import {importData, get, setKey, setValue, addItem, removeItem} from '../utilities/data'

export const getSchema = (state, path) => {

}

export const getData = (state, path) => get(state.data, path)

const data = (state, action) => {
  const {type, payload} = action
  switch (type) {
    case types.SET_DEFAULTS:
      return setValue(state, payload.path, defaults(payload.schema, payload.choice))
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
        dirty: payload.choice != null ? true : undefined,
        data: data(state.data, action)
      }
    case types.SET_KEY:
    case types.SET_VALUE:
    case types.REMOVE_ITEM:
      return {
        ...state,
        dirty: true,
        data: data(state.data, action)
      }
    case types.ADD_ITEM:
      return {
        ...state,
        dirty: needsChoice(payload.schema) ? undefined : true,
        data: data(state.data, action)
      }
    case types.SYNC:
      return {
        ...state,
        dirty: undefined
      }
    default:
      return state
  }
}
