import React from 'react'

import {input} from '../styles'

const EnumEditor = ({schema, data, path, setValue}) => (
  <select value={data} onChange={event => setValue(path, event.target.value)} style={input}>
    {schema.enum.map(item => <option key={item} value={item}>{item}</option>)}
  </select>
)

export default EnumEditor
