import React from 'react'

import {asciiTree} from '../utilities/path'
import {row, cell, buttonGroup, button} from './styles'

const required = {
  color: 'red'
}

const label = {
  fontWeight: 'bold'
}

const description = {
  color: 'grey',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}

const CaptionRow = ({schema, data, title, path, required, canDelete}) => {
  const summary = schema.description

  if (title == null) {
    return null
  }

  const canAdd = schema.additionalProperties || (schema.items && schema.additionalItems !== false)

  return (
    <div style={row}>
      <div style={cell}>
        <span dangerouslySetInnerHTML={{__html: asciiTree(path)}} />
        {required ? <span style={required}>*</span> : null}
        <span style={label}>{title}</span>
      </div>
      <div style={cell}>
        <div style={buttonGroup}>
          {canDelete ? <div style={button} onClick={console.log}>&ndash;</div> : null}
          {canAdd ? <div style={button} onClick={console.log}>+</div> : null}
        </div>
        <div style={description}>
          {summary}
        </div>
      </div>
    </div>
  )
}

export default CaptionRow
