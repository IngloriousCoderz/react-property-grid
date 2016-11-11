import * as types from '../constants/actionTypes'
import {clone} from '../utilities/data'
import {setKey, setValue, addItem, removeItem} from '../utilities/data'
import {split} from '../utilities/path'

const data = (state, action) => {
  const {type, payload} = action
  switch (type) {
    case types.SET_KEY:
      return setKey(clone(state), split(payload.path), payload.key)
    case types.SET_VALUE:
      return setValue(clone(state), split(payload.path), payload.value)
    case types.ADD_ITEM:
      return addItem(clone(state), split(payload.path), payload.schema)
    case types.REMOVE_ITEM:
      return removeItem(clone(state), split(payload.path))
    default:
      return state
  }
}

export default (state, action) => {
  const {type} = action
  switch (type) {
    case types.SET_KEY:
    case types.SET_VALUE:
    case types.ADD_ITEM:
    case types.REMOVE_ITEM:
      return data(state, action)
    default:
      return state
  }
}
