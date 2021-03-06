import React from 'react'
import {connect} from 'react-redux'

import {splitProperties} from '../utilities/data'
import {addItem, removeItem} from '../actions'
import Summary from './Summary'
import PropertiesEditor from './Properties'
import AdditionalPropertiesEditor from './AdditionalProperties'
import expandable from './hoc/expandable'

const ObjectEditor = ({schema, data, title, description, path, required, expanded, toggleExpanded, canEditKey, canRemove}) => {
  const canAddOrRemoveProperties = schema.additionalProperties

  const {properties, additionalProperties} = splitProperties(data, schema)

  return (
    <div>
      {title != null
        ? <Summary
            schema={schema}
            data={data}
            title={title}
            description={description}
            path={path}
            required={required}
            expanded={expanded}
            toggleExpanded={toggleExpanded}
            canAdd={canAddOrRemoveProperties}
            canEditKey={canEditKey}
            canRemove={canRemove} />
        : null}
      {expanded
        ? <PropertiesEditor
          schema={schema.properties}
          data={properties}
          path={path}
          requireds={schema.required} />
        : null}
      {expanded
        ? <AdditionalPropertiesEditor
          schema={schema.additionalProperties}
          data={additionalProperties}
          path={path} />
        : null}
    </div>
  )
}

export default connect(null, {addItem, removeItem})(expandable(ObjectEditor))
