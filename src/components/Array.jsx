import React from 'react'
import {connect} from 'react-redux-custom-store'
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc'

import NAMESPACE from '../constants/namespace'
import {child, last} from '../utilities/path'
import Summary from './Summary'
import PropertyEditor from './Property'
import Expandable from './hoc/expandable'
import {setValue} from '../actions'

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

const ListItem = ({schema, data, title, path, index, canRemove}) => (
  <PropertyEditor
    schema={schema.items}
    data={data}
    title={`${schema.title || title}[${index}]`}
    path={path}
    canRemove={canRemove} />
)

const SortableItem = SortableElement(props => (
  <div style={{position: 'relative'}}>
    <DragHandle />
    <ListItem {...props} />
  </div>
))

const List = ({schema, data, path, canRemove}) => (
  <div>
    {data.map((item, index) => {
      const title = last(path)
      const childPath = child(path, index)
      return (
        <SortableItem
          key={item.__id || childPath}
          schema={schema}
          data={item}
          title={title}
          path={childPath}
          index={index}
          canRemove={canRemove} />
      )
    })}
  </div>
)

const SortableList = SortableContainer(List)

const ArrayEditor = ({schema, data, title, path, required, expanded, toggleExpanded, canEditKey, setValue, canRemove}) => {
  const canAddItems = schema.additionalItems !== false && (schema.maxItems == null || data.length < schema.maxItems)
  const canRemoveItems = schema.additionalItems !== false && (schema.minItems == null || data.length > schema.minItems)

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
        canAdd={canAddItems}
        canRemove={canRemove} />
      {expanded
        ? <SortableList
            lockAxis={'y'}
            // pressDelay={200}
            useDragHandle={true}
            onSortEnd={({oldIndex, newIndex, collection}, e) => setValue(path, arrayMove(data, oldIndex, newIndex))}
            schema={schema}
            data={data}
            path={path}
            canRemove={canRemoveItems} />
        : null}
    </div>
  )
}

export default connect(null, {setValue})(Expandable(ArrayEditor), NAMESPACE)
