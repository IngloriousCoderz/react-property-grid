import React from 'react'

const styles = {
  input: {
    width: '100%',
    margin: 0,
    border: 0,
    padding: '2px'
  },
}

const TextEditor = ({schema, data, path, setData}) => <input type='text' value={data} onChange={event => setData(path, event.target.value)} style={styles.input} />

export default TextEditor
