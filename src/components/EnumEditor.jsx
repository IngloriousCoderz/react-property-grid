import React from 'react'

const styles = {
  input: {
    width: '100%',
    margin: 0,
    border: 0,
    padding: '2px'
  },
}

const EnumEditor = ({schema, data, path, setData}) => (
  <select value={data} onChange={event => setData(path, event.target.value)} style={styles.input}>
    {schema.enum.map(item => <option key={item} value={item}>{item}</option>)}
  </select>
)

export default EnumEditor
