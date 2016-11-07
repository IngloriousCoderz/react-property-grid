import React from 'react'

const styles = {
  input: {
    width: '100%',
    margin: 0,
    border: 0,
    padding: '2px',
    textAlign: 'right'
  },
}

const NumberEditor = ({schema, data, path, setData}) => <input type='number' value={data} onChange={event => setData(path, event.target.value)} style={styles.input} />

export default NumberEditor
