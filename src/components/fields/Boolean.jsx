import React from 'react'
import {connect} from 'react-redux'

import withCaption from '../hoc/with-caption'
import {setValue} from '../../actions'
import {input} from '../styles'

const boolean = {
  width: '100%',
  margin: 0,
  textAlign: 'center',
  verticalAlign: 'middle'
}

const BooleanEditor = ({schema, data, path, setValue}) => (
  <div style={input}>
    <input type='checkbox'
      defaultChecked={data}
      onChange={event => setValue(path, event.target.checked)}
      style={boolean} />
  </div>
)

export default withCaption({field: true})(connect(null, {setValue})(BooleanEditor))
