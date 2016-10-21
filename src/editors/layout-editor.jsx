import React from 'react'
import ObjectEditor from './object-editor'

class LayoutEditor extends React.Component {
  render() {
    const {schema, data, ...rest} = this.props.options
    const clonedData = JSON.parse(JSON.stringify(data))
    const options = {...rest, data:clonedData, schema, fullSchema:schema}
    return (<ObjectEditor options={options}/>)
  }
}

export default LayoutEditor
