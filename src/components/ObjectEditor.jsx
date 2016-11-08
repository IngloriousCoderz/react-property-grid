import React, {Component} from 'react'
import {connect} from 'react-redux'

import {addItem, removeItem} from '../actions'
import Summary from './Summary'
import PropertiesEditor from './PropertiesEditor'
import AdditionalPropertiesEditor from './AdditionalPropertiesEditor'
import AnyOfEditor from './AnyOfEditor'
import Expandable from './Expandable'

const ObjectEditor = ({schema, data, title, path, required, expanded, toggleExpanded, canRemove, addItem, removeItem}) => {
  const canAddOrRemoveProperties = schema.additionalProperties
  return (
    <div>
      {title != null ? <Summary schema={schema} data={data} title={title} path={path} required={required} expanded={expanded} toggleExpanded={toggleExpanded} canAdd={canAddOrRemoveProperties} canRemove={canRemove} addItem={addItem} removeItem={removeItem} /> : null}
      {expanded ?
        <div>
          <PropertiesEditor schema={schema.properties} data={data} path={path} requireds={schema.required} />
          <AdditionalPropertiesEditor schema={schema.additionalProperties} data={data} path={path} />
          <AnyOfEditor schema={schema.anyOf} data={data} path={path} />
        </div>
      : null}
    </div>
  )
}

export default connect(() => ({}), {addItem, removeItem})(Expandable(ObjectEditor))
