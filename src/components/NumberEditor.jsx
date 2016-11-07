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

const NumberEditor = ({schema, data}) => <input type='number' value={data} onChange={console.log} style={styles.input} />

export default NumberEditor
