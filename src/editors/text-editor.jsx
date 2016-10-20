import React from 'react'

class TextEditor extends React.Component {
  render() {
    return (
      <input type='text' value={this.props.options.data}/>)
  }
}

export default TextEditor
