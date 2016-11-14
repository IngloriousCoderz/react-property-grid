import * as types from '../constants/actionTypes'
import {setKey, setValue, addItem, removeItem, swapItems} from '../utilities/data'

const data = (state, action) => {
  const {type, payload} = action
  switch (type) {
    case types.SET_KEY:
      return setKey(state, payload.path, payload.key)
    case types.SET_VALUE:
      return setValue(state, payload.path, payload.value)
    case types.ADD_ITEM:
      return addItem(state, payload.path, payload.schema)
    case types.REMOVE_ITEM:
      return removeItem(state, payload.path)
    case types.SWAP_ITEMS:
      return swapItems(state, payload.path, payload.index1, payload.index2)
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
    case types.SWAP_ITEMS:
      return {
        ...state,
        data: data(state.data, action)
      }
    default:
      return state
  }
}
