import * as types from '../constants/actionTypes'

export const setData = (path, data) => ({
  type: types.SET_DATA,
  payload: {
    path,
    data
  }
})
