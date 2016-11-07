import React from 'react'

const styles = {
  input: {
    width: '100%',
    textAlign: 'center'
  }
}

const BooleanEditor = ({schema, data, path, setData}) => <input type='checkbox' checked={data} onChange={event => setData(path, event.target.checked)} style={styles.input} />

export default BooleanEditor
