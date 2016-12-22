import React from 'react'
import {connect} from 'react-redux-custom-store'

import {match} from '../utilities/schema'
import NAMESPACE from '../constants/namespace'
import PropertyEditor from './Property'
import {cell, label} from './styles'

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
  ...cell,
  ...label,
  width: '100%',
  fontWeight: 'bold',
  textAlign: 'center'
}

const RootEditor = ({rootSchema, data, title}) => {
  let schema = rootSchema
  if (schema.anyOf != null) {
    schema = match(schema.anyOf, data)
  }

  return (
    <div className='react-property-grid' style={editor}>
      {title != null ? <div style={header}>{title}</div> : null}
      <PropertyEditor schema={schema} data={data} path='$' expanded={true} />
    </div>
  )
}

export default connect(({rootSchema, data}) => ({rootSchema, data}))(RootEditor, NAMESPACE)
