import React from 'react'
import {connect} from 'react-redux'

import {addItem, removeItem} from '../actions'
import {last, subpath} from '../utilities/path'
import Summary from './Summary'
import PropertyEditor from './PropertyEditor'
import Expandable from './Expandable'

const ArrayEditor = ({schema, data, title, path, required, expanded, toggleExpanded, canRemove, addItem, removeItem}) => {
  const canAddOrRemoveItems = schema.additionalItems !== false
  return (
    <div>
      <Summary schema={schema} data={data} title={title} path={path} required={required} expanded={expanded} toggleExpanded={toggleExpanded} canAdd={canAddOrRemoveItems} canRemove={canRemove} addItem={addItem} removeItem={removeItem} />
      {expanded ? data.map((item, index) => {
        const sub = subpath(path, index)
        const title = schema.title || last(sub)
          return <PropertyEditor key={sub} schema={schema.items} data={item} title={`${title}[${index}]`} path={sub} canRemove={canAddOrRemoveItems} />
      }) : null}
    </div>
  )
}

export default connect(() => ({}), {addItem, removeItem})(Expandable(ArrayEditor))
