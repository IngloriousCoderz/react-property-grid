import React from 'react'
import {connect} from 'react-redux'

import {addItem, removeItem} from '../actions'
import Summary from './Summary'
import PropertiesEditor from './PropertiesEditor'
import AdditionalPropertiesEditor from './AdditionalPropertiesEditor'
import AnyOfEditor from './AnyOfEditor'

const ObjectEditor = ({schema, data, title, path, canRemove, addItem, removeItem}) => {
  const canAddOrRemoveProperties = schema.additionalProperties
  return (
    <div>
      {title != null ? <Summary schema={schema} data={data} title={title} path={path} canAdd={canAddOrRemoveProperties} canRemove={canRemove} addItem={addItem} removeItem={removeItem} /> : null}
      <PropertiesEditor schema={schema.properties} data={data} path={path} />
      <AdditionalPropertiesEditor schema={schema.additionalProperties} data={data} path={path} />
      <AnyOfEditor schema={schema.anyOf} data={data} path={path} />
    </div>
  )
}

export default connect(() => ({}), {addItem, removeItem})(ObjectEditor)
