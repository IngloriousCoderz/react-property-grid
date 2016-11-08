import React from 'react'
import {connect} from 'react-redux'

import {matchSchema} from '../utilities'
import {addItem, removeItem} from '../actions'
import Summary from './Summary'
import PropertiesEditor from './PropertiesEditor'
import AdditionalPropertiesEditor from './AdditionalPropertiesEditor'
import Expandable from './Expandable'

const ObjectEditor = ({schema, data, title, path, required, expanded, toggleExpanded, canRemove, addItem, removeItem, rootSchema}) => {
  const canAddOrRemoveProperties = schema.additionalProperties

  if (schema.anyOf != null) {
    schema = matchSchema(schema.anyOf, data, rootSchema)
  }

  return (
    <div>
      {title != null ? <Summary schema={schema} data={data} title={title} path={path} required={required} expanded={expanded} toggleExpanded={toggleExpanded} canAdd={canAddOrRemoveProperties} canRemove={canRemove} addItem={addItem} removeItem={removeItem} /> : null}
      {expanded ?
        <div>
          <PropertiesEditor schema={schema.properties} data={data} path={path} requireds={schema.required} />
          <AdditionalPropertiesEditor schema={schema.additionalProperties} data={data} path={path} />
        </div>
      : null}
    </div>
  )
}

export default connect(({rootSchema}) => ({rootSchema}), {addItem, removeItem})(Expandable(ObjectEditor))
