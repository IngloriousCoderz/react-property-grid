import React from 'react'

const EnumEditor = ({schema, data, path, style, setData}) => (
  <select value={data} onChange={event => setData(path, event.target.value)} style={style}>
    {schema.enum.map(item => <option key={item} value={item}>{item}</option>)}
  </select>
)

export default EnumEditor
