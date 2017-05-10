import React from 'react'
import {connect} from 'react-redux'

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

const RootEditor = ({title, rootSchema}) => (
  <div className='react-property-grid' style={editor}>
    {title != null ? <div style={header}>{title}</div> : null}
    <PropertyEditor schema={rootSchema} path='$' expanded={true} />
  </div>
)

export default connect(({rootSchema}) => ({rootSchema}))(RootEditor)
