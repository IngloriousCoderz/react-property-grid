import React from 'react'

const styles = {
  input: {
    width: '100%',
    textAlign: 'center'
  }
}

export default ({schema, data}) => <input type='checkbox' checked={data} onChange={console.log} style={styles.input} />
