import * as types from '../constants/actionTypes'

export const init = (schema, data) => ({
  type: types.INIT,
  payload: {
    schema,
    data
  }
})

export const setDefaults = (path, schema) => ({
  type: types.SET_DEFAULTS,
  payload: {
    path,
    schema
  }
})

export const setKey = (path, key) => ({
  type: types.SET_KEY,
  payload: {
    path,
    key
  }
})

export const setValue = (path, value) => ({
  type: types.SET_VALUE,
  payload: {
    path,
    value
  }
})

export const addItem = (path, schema) => ({
  type: types.ADD_ITEM,
  payload: {
    path,
    schema
  }
})

export const removeItem = path => ({
  type: types.REMOVE_ITEM,
  payload: {
    path
  }
})

export const sync = () => ({
  type: types.SYNC
})
