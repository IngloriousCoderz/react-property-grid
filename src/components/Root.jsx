import React from 'react'
import {connect} from 'react-redux-custom-store'

import NAMESPACE from '../constants/namespace'
import PropertiesEditor from './Properties'
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

const RootEditor = ({rootSchema, data, title}) => (
  <div style={editor}>
    {title != null ? <div style={{...cell, ...header}}>{title}</div> : null}
    <PropertiesEditor schema={rootSchema.properties} data={data} path={'$'} requireds={rootSchema.required} />
  </div>
)

export default connect(({rootSchema, data}) => ({rootSchema, data}))(RootEditor, NAMESPACE)
