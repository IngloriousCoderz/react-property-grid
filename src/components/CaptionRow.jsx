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
    padding: '2px'
  },
  required: {
    color: 'red'
  },
  label: {
    fontWeight: 'bold'
  },
  description: {
    color: 'grey',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  buttonGroup: {
    float: 'right'
  },
  button: {
    display: 'inline-block',
    width: 14,
    borderLeft: '1px solid lightgrey',
    textAlign: 'center'
  }
}

const CaptionRow = ({schema, data, title, path, required, canDelete}) => {
  const summary = schema.description

  if (title == null) {
    return null
  }

  const canAdd = schema.additionalProperties || (schema.items && schema.additionalItems !== false)

  return (
    <div style={styles.row}>
      <div style={styles.cell}>
        <span dangerouslySetInnerHTML={{__html: asciiTree(path)}} />
        {required ? <span style={styles.required}>*</span> : null}
        <span style={styles.label}>{title}</span>
      </div>
      <div style={styles.cell}>
        <div style={styles.buttonGroup}>
          {canDelete ? <div style={styles.button} onClick={console.log}>&ndash;</div> : null}
          {canAdd ? <div style={styles.button} onClick={console.log}>+</div> : null}
        </div>
        <div style={styles.description}>
          {summary}
        </div>
      </div>
    </div>
  )
}

export default CaptionRow
