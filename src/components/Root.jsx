import React from 'react'
import {connect} from 'react-redux-custom-store'

import {match} from '../utilities/schema'
import {splitProperties} from '../utilities/data'
import NAMESPACE from '../constants/namespace'
import PropertiesEditor from './Properties'
import AdditionalPropertiesEditor from './AdditionalProperties'
import {cell} from './styles'

const editor = {
  fontFamily: 'sans-serif',
  fontSize: 12,
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
  let schema = rootSchema
  if (schema.anyOf != null) {
    schema = match(schema.anyOf, data)
  }

  const {properties, additionalProperties} = splitProperties(data, schema)

  return (
    <div style={editor}>
      {title != null
        ? <div style={{...cell, ...header}}>{title}</div>
        : null}
      <PropertiesEditor
        schema={schema.properties}
        data={properties}
        path='$'
        requireds={schema.required} />
      <AdditionalPropertiesEditor
        schema={schema.additionalProperties}
        data={additionalProperties}
        path='$' />
    </div>
  )
}

export default connect(({rootSchema, data}) => ({rootSchema, data}))(RootEditor, NAMESPACE)
