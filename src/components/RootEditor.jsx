import React from 'react'
import {connect} from 'react-redux'

import PropertiesEditor from './PropertiesEditor'

const styles = {
  editor: {
    // display: 'table',
    width: '100%',
    // borderCollapse: 'collapse',
    fontSize: '12px'
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  cell: {
    height: '20px',
    border: '1px solid lightgrey',
    padding: '2px'
  },
  body: {
    // display: 'table-row-group'
  }
}

const RootEditor = ({rootSchema, data, title}) => (
  <div style={styles.editor}>
    <div style={{...styles.header, ...styles.cell}}>{title}</div>
    <div style={styles.body}>
      <PropertiesEditor schema={rootSchema.properties} data={data} />
    </div>
  </div>
)

export default connect(({rootSchema, data}) => ({rootSchema, data}))(RootEditor)
