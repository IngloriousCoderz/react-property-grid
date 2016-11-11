import React from 'react'
import {connect} from 'react-redux'

import {addItem, removeItem} from '../actions'
import Summary from './Summary'
import PropertiesEditor from './Properties'
import AdditionalPropertiesEditor from './AdditionalProperties'
import expandable from './expandable'

const ObjectEditor = ({schema, data, title, path, required, expanded, toggleExpanded, canEditKey, canRemove, addItem, removeItem}) => {
  const canAddOrRemoveProperties = schema.additionalProperties

  return (
    <div>
      {title != null ? <Summary schema={schema} data={data} title={title} path={path} required={required} expanded={expanded} toggleExpanded={toggleExpanded} canAdd={canAddOrRemoveProperties} canEditKey={canEditKey} canRemove={canRemove} addItem={addItem} removeItem={removeItem} /> : null}
      {expanded ?
        <div>
          <PropertiesEditor schema={schema.properties} data={data} path={path} requireds={schema.required} />
          <AdditionalPropertiesEditor schema={schema.additionalProperties} data={data} path={path} />
        </div>
      : null}
    </div>
  )
}

export default connect(() => ({}), {addItem, removeItem})(expandable(ObjectEditor))
