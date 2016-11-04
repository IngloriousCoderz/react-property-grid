import React from 'react'

const styles = {
  fullWidth: {
    width: '100%'
  }
}

class TextEditor extends React.Component {
  render() {
    return (
      <input type='text' value={this.props.data} style={styles.fullWidth} />
    )
  }
}

export default TextEditor
