import React from 'react'
import {connect} from 'react-redux-custom-store'

import {match} from '../utilities/schema'
import NAMESPACE from '../constants/namespace'
import PropertiesEditor from './Properties'
import AdditionalPropertiesEditor from './AdditionalProperties'
import {cell} from './styles'

const editor = {
  fontFamily: 'sans-serif',
  fontSize: '12px',
  margin: 0,
  borderTop: '1px solid lightgrey',
  borderLeft: '1px solid lightgrey',
  padding: 0,
  userSelect: 'none'
}

const header = {
  width: '100%',
  fontWeight: 'bold',
  textAlign: 'center'
}

const RootEditor = ({rootSchema, data, title}) => {
  let subschema = rootSchema
  if (subschema.anyOf != null) {
    subschema = match(subschema.anyOf, data)
  }

  return (
    <div style={editor}>
      {title != null ? <div style={{...cell, ...header}}>{title}</div> : null}
      <PropertiesEditor schema={subschema.properties} data={data} path='$' requireds={subschema.required} />
      <AdditionalPropertiesEditor schema={subschema.additionalProperties} data={data} path='$' />
    </div>
  )
}

export default connect(({rootSchema, data}) => ({rootSchema, data}))(RootEditor, NAMESPACE)
