import React from 'react'

const styles = {
  boolean: {
    textAlign: 'center',
    verticalAlign: 'middle'
  }
}

const BooleanEditor = ({schema, data, path, style, setData}) => <input type='checkbox' checked={data} onChange={event => setData(path, event.target.checked)} style={{...style, ...styles.boolean}} />

export default BooleanEditor
