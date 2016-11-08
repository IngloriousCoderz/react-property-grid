import React from 'react'
import {connect} from 'react-redux'

import PropertiesEditor from './PropertiesEditor'
import {cell} from './styles'

const editor = {
  // display: 'table',
  // width: '100%',
  // borderCollapse: 'collapse',
  fontSize: '12px'
}

const header = {
  width: '100%',
  fontWeight: 'bold',
  textAlign: 'center'
}

const RootEditor = ({rootSchema, data, title}) => (
  <div style={editor}>
    <div style={{...cell, ...header}}>{title}</div>
    <PropertiesEditor schema={rootSchema.properties} data={data} />
  </div>
)

export default connect(({rootSchema, data}) => ({rootSchema, data}))(RootEditor)
