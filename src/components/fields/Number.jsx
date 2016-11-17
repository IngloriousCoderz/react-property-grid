import React from 'react'
import {Debounce} from 'react-throttle'
import {connect} from 'react-redux-custom-store'

import NAMESPACE from '../../constants/namespace'
import {setValue} from '../../actions'
import {input} from '../styles'

const number = {
  textAlign: 'right'
}

const NumberEditor = ({schema, data, path, setValue}) => (
  <Debounce time='500' handler='onChange'>
    <input type='number'
      step={schema.multipleOf}
      min={schema.minimum + (schema.exclusiveMinimum ? 1 : 0)}
      max={schema.maximum - (schema.exclusiveMaximum ? 1 : 0)}
      defaultValue={data}
      onChange={event => setValue(path, parseFloat(event.target.value))}
      style={{...input, ...number}} />
  </Debounce>
)

export default connect(null, {setValue})(NumberEditor, NAMESPACE)
