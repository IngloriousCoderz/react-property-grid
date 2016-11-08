import React from 'react'

const styles = {
  number: {
    textAlign: 'right'
  },
}

const NumberEditor = ({schema, data, path, style, setData}) => <input type='number' value={data} onChange={event => setData(path, event.target.value)} style={{...style, ...styles.number}} />

export default NumberEditor
