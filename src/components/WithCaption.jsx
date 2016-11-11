import React from 'react'
import {connect} from 'react-redux'

import {level} from '../utilities/path'
import TextEditor from './TextEditor'
import {setKey} from '../actions'
import {row, ellipsis, cell, buttonGroup, button} from './styles'

const EXPANDER_WIDTH = 10
const EXPANDED_ENTITY = '&dtri;'
const COLLAPSED_ENTITY = '&rtri;'

const headerRow = {
  ...row,
  background: '#FAFAFA'
}

const expander = {
  float: 'left',
  cursor: 'pointer'
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

const WithCaption = ({field}) => Component => {
  const Row = ({schema, data, title, path, required, expanded, toggleExpanded, canEditKey, setKey, setValue, canAdd, addItem, canRemove, removeItem}) => {
    const caption = {
      ...(canEditKey ? fieldCell : cell),
      paddingLeft: cell.padding + EXPANDER_WIDTH * (level(path) - 1 + (expanded != null ? 0 : 1))
    }

    const buttons = canAdd || canRemove ?
      <div style={field ? paddedButtonGroup : buttonGroup}>
        {canRemove ? <div style={button} onClick={() => removeItem(path)}>-</div> : null}
        {canAdd ? <div style={button} onClick={() => addItem(path, schema)}>+</div> : null}
      </div>
    : null

    return (
      <div style={field ? row : headerRow}>
        <div style={caption}>
          {expanded != null ? <div style={expander}>
            <span dangerouslySetInnerHTML={{__html: expanded ? EXPANDED_ENTITY : COLLAPSED_ENTITY}} onClick={toggleExpanded} />
          </div> : null}
          {canEditKey ? <div style={ellipsis}>
            <TextEditor schema={schema} data={title} path={path} setValue={setKey} /></div>
            : <span style={label}>{title}</span>}
          {required ? <span style={redStar}>*</span> : null}
        </div>
        <div style={field ? fieldCell : cell}>
          {buttons}
          <div style={ellipsis}>
            <Component schema={schema} data={data} title={title} path={path} setValue={setValue} canAdd={canAdd} canRemove={canRemove} addItem={addItem} removeItem={removeItem} />
          </div>
        </div>
      </div>
    )
  }
  return connect(() => ({}), {setKey})(Row)
}

export default WithCaption
