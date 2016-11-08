import React from 'react'

import {input} from './styles'

const EnumEditor = ({schema, data, path, setData}) => (
  <select value={data} onChange={event => setData(path, event.target.value)} style={input}>
    {schema.enum.map(item => <option key={item} value={item}>{item}</option>)}
  </select>
)

export default EnumEditor
