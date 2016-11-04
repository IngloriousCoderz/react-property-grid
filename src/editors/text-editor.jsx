import React, {Component} from 'react'

const styles = {
  input: {
    width: '100%',
    margin: 0,
    border: 0,
    padding: '2px'
  },
}

class TextEditor extends Component {
  render() {
    return (
      <input type='text' value={this.props.data} style={styles.input} />
    )
  }
}

export default TextEditor
