import React from 'react'

import {asciiTree} from '../utilities/path'
import {row, ellipsis, cell, buttonGroup, button} from './styles'

const redStar = {
  color: 'red'
}

const label = {
  fontWeight: 'bold'
}

const WithCaption = Component => ({schema, data, title, path, required, canDelete, canAdd}) => (
  <div style={row}>
    <div style={cell}>
      <span dangerouslySetInnerHTML={{__html: asciiTree(path)}} />
      {required ? <span style={redStar}>*</span> : null}
      <span style={label}>{title}</span>
    </div>
    <div style={cell}>
      <div style={buttonGroup}>
        {canDelete ? <div style={button} onClick={console.log}>&ndash;</div> : null}
        {canAdd ? <div style={button} onClick={console.log}>+</div> : null}
      </div>
      <div style={ellipsis}>
        <Component schema={schema} data={data} title={title} path={path} canDelete={canDelete} />
      </div>
    </div>
  </div>
)

export default WithCaption
