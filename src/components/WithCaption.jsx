import React from 'react'

import {level} from '../utilities/path'
import {row, ellipsis, cell, buttonGroup, button} from './styles'

const EXPANDER_WIDTH = 10
const EXPANDED_ENTITY = '&dtri;'
const COLLAPSED_ENTITY = '&rtri;'

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
  padding: 3
}

const WithCaption = ({field}) => Component => ({schema, data, title, path, required, expanded, toggleExpanded, setData, canAdd, addItem, canRemove, removeItem}) => (
  <div style={field ? row : headerRow}>
    <div style={{...cell, paddingLeft: cell.padding + EXPANDER_WIDTH * (level(path) + (expanded != null ? 0 : 1))}}>
      {expanded != null ? <span dangerouslySetInnerHTML={{__html: expanded ? EXPANDED_ENTITY : COLLAPSED_ENTITY}} onClick={toggleExpanded} /> : null}
      <span style={label}>{title}</span>
      {required ? <span style={redStar}>*</span> : null}
    </div>
    <div style={field ? fieldCell : cell}>
      {canAdd || canRemove ?
        <div style={field ? paddedButtonGroup : buttonGroup}>
          {canRemove ? <div style={button} onClick={() => removeItem(path, schema)}>-</div> : null/*&ndash;*/}
          {canAdd ? <div style={button} onClick={() => addItem(path, schema)}>+</div> : null}
        </div>
      : null}
      <div style={ellipsis}>
        <Component schema={schema} data={data} title={title} path={path} setData={setData} canAdd={canAdd} canRemove={canRemove} addItem={addItem} removeItem={removeItem} />
      </div>
    </div>
  </div>
)

export default WithCaption
