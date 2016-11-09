import React from 'react'

import {asciiTree} from '../utilities/path'
import {row, ellipsis, cell, buttonGroup, button} from './styles'

const headerRow = {
  ...row,
  background: '#FAFAFA'
}

const redStar = {
  color: 'red'
}

const label = {
  // fontWeight: 'bold'
}

const fieldCell = {
  ...cell,
  padding: 0
}

const paddedButtonGroup = {
  ...buttonGroup,
  padding: 2
}

const WithCaption = ({field}) => Component => ({schema, data, title, path, required, expanded, toggleExpanded, setData, canAdd, addItem, canRemove, removeItem}) => (
  <div style={field ? row : headerRow}>
    <div style={cell}>
      <span dangerouslySetInnerHTML={{__html: asciiTree(path, expanded)}} onClick={toggleExpanded} />
      <span style={label}>{title}</span>
      {required ? <span style={redStar}>*</span> : null}
    </div>
    <div style={field ? fieldCell : cell}>
      <div style={field ? paddedButtonGroup : buttonGroup}>
        {canRemove ? <div style={button} onClick={() => removeItem(path, schema)}>&ndash;</div> : null}
        {canAdd ? <div style={button} onClick={() => addItem(path, schema)}>+</div> : null}
      </div>
      <div style={ellipsis}>
        <Component schema={schema} data={data} title={title} path={path} setData={setData} canAdd={canAdd} canRemove={canRemove} addItem={addItem} removeItem={removeItem} />
      </div>
    </div>
  </div>
)

export default WithCaption
