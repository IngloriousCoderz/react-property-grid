import React from 'react'
import {connect} from 'react-redux-custom-store'

import NAMESPACE from '../../constants/namespace'
import {level} from '../../utilities/path'
import TextEditor from './../fields/Text'
import {setKey, addItem, removeItem} from '../../actions'
import {row, ellipsis, cell, label, buttonGroup, button} from './../styles'

const EXPANDER_WIDTH = 10
const EXPANDED_ICON = '&dtri;'
const COLLAPSED_ICON = '&rtri;'
const REQUIRED_ICON = '*'
const ADD_ICON = '+'
const REMOVE_ICON = '-'

const headerRow = {
  ...row,
  background: '#FAFAFA'
}

const expander = {
  float: 'left',
  cursor: 'pointer',
  marginRight: 2
}

const fieldExpander = {
  ...expander,
  padding: 3
}

const redStar = {
  color: 'red'
}

const fieldCell = {
  ...cell,
  padding: 0
}

const paddedButtonGroup = {
  ...buttonGroup,
  padding: 3
}

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component'

const withCaption = ({field}) => WrappedComponent => {
  const Row = props => {
    // useful for row: schema, title, path, required, expanded, toggleExpanded, canEditKey, setKey, canAdd, addItem, canRemove, removeItem
    //useful for wrapped: schema, data, title, path, canAdd, canRemove
    const {schema, data, title, path, required, expanded, toggleExpanded, canEditKey, setKey, canAdd, addItem, canRemove, removeItem} = props
    const caption = {
      ...(canEditKey ? fieldCell : cell),
      paddingLeft: cell.padding + EXPANDER_WIDTH * (level(path) + (expanded != null ? 0 : 1))
    }

    return (
      <div style={field ? row : headerRow}>
        <div style={caption}>
          {expanded != null
            ? <div style={canEditKey ? fieldExpander : expander}>
                <span dangerouslySetInnerHTML={{__html: expanded ? EXPANDED_ICON : COLLAPSED_ICON}} onClick={toggleExpanded} />
              </div>
            : null}
          {canEditKey
            ? <div style={ellipsis}>
                <TextEditor schema={schema} data={title} path={path} setValue={setKey} />
              </div>
            : <span style={label}>{title}</span>}
          {required ? <span style={redStar}>{REQUIRED_ICON}</span> : null}
        </div>
        <div style={field ? fieldCell : cell}>
          {canAdd || canRemove
            ? <div style={field ? paddedButtonGroup : buttonGroup}>
                {canRemove ? <div style={button} onClick={() => removeItem(path)}>{REMOVE_ICON}</div> : null}
                {canAdd ? <div style={button} onClick={() => addItem(path, schema)}>{ADD_ICON}</div> : null}
              </div>
            : null}
          <div style={ellipsis}>
            <WrappedComponent schema={schema} data={data} title={title} path={path} />
          </div>
        </div>
      </div>
    )
  }

  Row.displayName = `Row(${getDisplayName(WrappedComponent)})`

  return connect(null, {setKey, addItem, removeItem})(Row, NAMESPACE)
}

export default withCaption
