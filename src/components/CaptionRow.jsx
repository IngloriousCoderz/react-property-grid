import React from 'react'

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

const CaptionRow = ({text, summary, path}) => {
  if (text == null) {
    return null
  }

  return (
    <div style={styles.row}>
      <div style={{...styles.cell,...styles.label}}>
        {'-'.repeat(path.split('.').length)}{text}
      </div>
      <div style={{...styles.cell, ...styles.description}}>
        {summary}
      </div>
    </div>
  )
}

export default CaptionRow
