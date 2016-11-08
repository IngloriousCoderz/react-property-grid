import React from 'react'

import {input} from './styles'

const boolean = {
  width: '100%',
  margin: 0,
  textAlign: 'center',
  verticalAlign: 'middle'
}

const BooleanEditor = ({schema, data, path, setData}) => <div style={input}><input type='checkbox' checked={data} onChange={event => setData(path, event.target.checked)} style={boolean} /></div>

export default BooleanEditor
