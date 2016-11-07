import React from 'react'

import {asciiTree} from '../utilities/path'

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
  label: {
    fontWeight: 'bold'
  },
  description: {
    color: 'grey'
  }
}

const CaptionRow = ({schema, data, title, path}) => {
  const summary = schema.description

  if (title == null) {
    return null
  }

  return (
    <div style={styles.row}>
      <div style={{...styles.cell,...styles.label}} >
        <span dangerouslySetInnerHTML={{__html: asciiTree(path)}} />{title}
      </div>
      <div style={{...styles.cell, ...styles.description}}>
        {summary}
      </div>
    </div>
  )
}

export default CaptionRow
