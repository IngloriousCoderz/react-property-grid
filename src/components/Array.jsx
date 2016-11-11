import React from 'react'
import {connect} from 'react-redux'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'

import {child, last} from '../utilities/path'
import Summary from './Summary'
import PropertyEditor from './Property'
import Expandable from './hoc/expandable'
import {addItem, removeItem} from '../actions'

const SortableItem = SortableElement(({schema, data, title, path, index, canAddOrRemoveItems}) => (
  <PropertyEditor
    schema={schema.items}
    data={data}
    title={`${schema.title || title}[${index}]`}
    path={path}
    canRemove={canAddOrRemoveItems} />
))

const SortableList = SortableContainer(({schema, data, path, canAddOrRemoveItems}) => (
  <div>
    {data.map((item, index) => {
      const title = last(path)
      const childPath = child(path, index)
      return <SortableItem key={item.__id || childPath} schema={schema} data={item} title={title} path={childPath} index={index} canAddOrRemoveItems={canAddOrRemoveItems} />
    })}
  </div>
))

const ArrayEditor = ({schema, data, title, path, required, expanded, toggleExpanded, canEditKey, canRemove, addItem, removeItem}) => {
  const canAddOrRemoveItems = schema.additionalItems !== false
  return (
    <div>
      <Summary schema={schema} data={data} title={title} path={path} required={required} expanded={expanded} toggleExpanded={toggleExpanded} canEditKey={canEditKey} canAdd={canAddOrRemoveItems} canRemove={canRemove} addItem={addItem} removeItem={removeItem} />
      {expanded ? <SortableList schema={schema} data={data} path={path} canAddOrRemoveItems={canAddOrRemoveItems} /> : null}
    </div>
  )
}

export default connect(null, {addItem, removeItem})(Expandable(ArrayEditor))
