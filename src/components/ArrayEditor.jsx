import React from 'react'
import {connect} from 'react-redux'

import {addItem, removeItem} from '../actions'
import {last, subpath} from '../utilities/path'
import Summary from './Summary'
import PropertyEditor from './PropertyEditor'

const ArrayEditor = ({schema, data, title, path, canRemove, addItem, removeItem}) => {
  const canAddOrRemoveItems = schema.additionalItems !== false
  return (
    <div>
      <Summary schema={schema} data={data} title={title} path={path} canAdd={canAddOrRemoveItems} canRemove={canRemove} addItem={addItem} removeItem={removeItem} />
      {data.map((item, index) => {
        const sub = subpath(path, index)
        const title = schema.title || last(sub)
          return <PropertyEditor key={sub} schema={schema.items} data={item} title={`${title}[${index}]`} path={sub} canRemove={canAddOrRemoveItems} />
      })}
    </div>
  )
}

export default connect(() => ({}), {addItem, removeItem})(ArrayEditor)
