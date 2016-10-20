import React from 'react'
import ObjectEditor from './object-editor'

class LayoutEditor extends React.Component {
  render() {
    const options = {...this.props.options, fullSchema:this.props.options.schema}
    return (<ObjectEditor options={options}/>)
  }
}

export default LayoutEditor
