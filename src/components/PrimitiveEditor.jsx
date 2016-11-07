import React from 'react'
import {connect} from 'react-redux'

import {getType} from '../utilities'
import {last, asciiTree} from '../utilities/path'
import BooleanEditor from './BooleanEditor'
import NumberEditor from './NumberEditor'
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
    padding: 0
  }
}

const PrimitiveEditor = ({schema, data, path, setData}) => {
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
    default:
      Component = TextEditor
  }

  return (
    <div style={styles.row}>
      <div style={styles.cell}>
        <span dangerouslySetInnerHTML={{__html: asciiTree(path)}} />{text}
      </div>
      <div style={{...styles.cell, ...styles.inputCell}}>
        <Component schema={schema} data={data} path={path} setData={setData} />
      </div>
    </div>
  )
}

export default connect(() => ({}), {setData})(PrimitiveEditor)
