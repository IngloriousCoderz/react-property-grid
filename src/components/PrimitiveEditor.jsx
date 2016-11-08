import React from 'react'
import {connect} from 'react-redux'

import {getType} from '../utilities'
import {last, asciiTree} from '../utilities/path'
import BooleanEditor from './BooleanEditor'
import NumberEditor from './NumberEditor'
import EnumEditor from './EnumEditor'
import TextEditor from './TextEditor'
import {setData} from '../actions'

const styles = {
  row: {
    // display: 'table-row'
  },
  cell: {
    // display: 'table-cell',
    display: 'inline-block',
    verticalAlign: 'top',
    width: '50%',
    height: '20px',
    borderRight: '1px solid lightgrey',
    borderBottom: '1px solid lightgrey',
    padding: '2px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  inputCell: {
    padding: 2
  },
  buttonGroup: {
    float: 'right'
  },
  button: {
    display: 'inline-block',
    width: 14,
    borderLeft: '1px solid lightgrey',
    textAlign: 'center'
  },
  field: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  input: {
    width: '100%',
    margin: 0,
    border: 0,
    padding: 0
  }
}

const PrimitiveEditor = ({schema, data, path, setData, canDelete}) => {
  const text = schema.title || last(path)
  const type = getType(schema)

  let Component
  switch (type) {
    case 'boolean':
      Component = BooleanEditor
      break
    case 'integer':
    case 'number':
      Component = NumberEditor
      break
    case 'enum':
      Component = EnumEditor
      break
    default:
      Component = TextEditor
  }

  return (
    <div style={styles.row}>
      <div style={styles.cell}>
        <span dangerouslySetInnerHTML={{__html: asciiTree(path)}} />{text}
      </div>
      <div style={{...styles.cell, ...styles.inputCell}}>
        <div style={styles.buttonGroup}>
          {canDelete ? <div style={styles.button} onClick={console.log}>&ndash;</div> : null}
        </div>
        <div style={styles.field}>
          <Component schema={schema} data={data} path={path} setData={setData} style={styles.input} />
        </div>
      </div>
    </div>
  )
}

export default connect(() => ({}), {setData})(PrimitiveEditor)