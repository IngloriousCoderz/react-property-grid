import * as types from '../constants/actionTypes'
import {clone} from '../utilities'
import {setKey, setValue} from '../utilities/data'
import {split} from '../utilities/path'

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
