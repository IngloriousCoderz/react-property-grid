import React from 'react'
import {connect} from 'react-redux'
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc'

import {child, last} from '../utilities/path'
import Summary from './Summary'
import PropertyEditor from './Property'
import Expandable from './hoc/expandable'
import {setValue, addItem, removeItem} from '../actions'

const drag = {
  width: 10,
  height: 10,
  position: 'absolute',
  top: 5,
  left: 2,
  opacity: .25,
  cursor: 'row-resize'
}

const DragHandle = SortableHandle(() => <svg style={drag} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><path d="M0 7.5v5h50v-5H0zm0 15v5h50v-5H0zm0 15v5h50v-5H0z" color="#000"/></svg>)

const SortableItem = SortableElement(({schema, data, title, path, index, canAddOrRemoveItems}) => (
  <div style={{position: 'relative'}}>
    <DragHandle />
    <PropertyEditor
      schema={schema.items}
      data={data}
      title={`${schema.title || title}[${index}]`}
      path={path}
      canRemove={canAddOrRemoveItems} />
  </div>
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

const ArrayEditor = ({schema, data, title, path, required, expanded, toggleExpanded, canEditKey, setValue, addItem, canRemove, removeItem}) => {
  const canAddOrRemoveItems = schema.additionalItems !== false
  return (
    <div>
      <Summary
        schema={schema}
        data={data}
        title={title}
        path={path}
        required={required}
        expanded={expanded}
        toggleExpanded={toggleExpanded}
        canEditKey={canEditKey}
        canAdd={canAddOrRemoveItems}
        canRemove={canRemove}
        addItem={addItem}
        removeItem={removeItem} />
      {expanded ?
        <SortableList
          lockAxis={'y'}
          // pressDelay={200}
          useDragHandle={true}
          onSortEnd={({oldIndex, newIndex, collection}, e) => setValue(path, arrayMove(data, oldIndex, newIndex))}
          schema={schema}
          data={data}
          path={path}
          canAddOrRemoveItems={canAddOrRemoveItems} />
      : null}
    </div>
  )
}

export default connect(null, {setValue, addItem, removeItem})(Expandable(ArrayEditor))
