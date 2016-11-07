import React from 'react'

import {last, asciiTree} from '../utilities/path'
import TextEditor from './TextEditor'

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

const PrimitiveEditor = ({schema, data, path}) => {
  const text = schema.title || last(path)

  return (
    <div style={styles.row}>
      <div style={styles.cell}>
        <span dangerouslySetInnerHTML={{__html: asciiTree(path)}} />{text}
      </div>
      <div style={{...styles.cell, ...styles.inputCell}}>
        <TextEditor schema={schema} data={data} />
      </div>
    </div>
  )
}

export default PrimitiveEditor
