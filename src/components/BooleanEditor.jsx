import React from 'react'

import {input} from './styles'

const boolean = {
  width: '100%',
  margin: 0,
  textAlign: 'center',
  verticalAlign: 'middle'
}

const BooleanEditor = ({schema, data, path, setValue}) => <div style={input}><input type='checkbox' defaultChecked={data} onChange={event => setValue(path, event.target.checked)} style={boolean} /></div>

export default BooleanEditor
