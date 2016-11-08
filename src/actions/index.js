import * as types from '../constants/actionTypes'

export const setData = (path, data) => ({
  type: types.SET_DATA,
  payload: {
    path,
    data
  }
})

export const addItem = (path, schema) => ({
  type: types.ADD_ITEM,
  payload: {
    path,
    schema
  }
})

export const removeItem = (path, schema) => ({
  type: types.REMOVE_ITEM,
  payload: {
    path,
    schema
  }
})
