import React from 'react'

const styles = {
  input: {
    width: '100%',
    margin: 0,
    border: 0,
    padding: '2px'
  },
}

const TextEditor = ({data}) => <input type='text' value={data} onChange={console.log} style={styles.input} />

export default TextEditor
