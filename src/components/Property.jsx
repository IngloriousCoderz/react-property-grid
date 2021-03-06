import React from 'react'
import {connect} from 'react-redux'

import {INTERNAL_ANY_OF} from '../utilities/data'
import {match, merge, getType} from '../utilities/schema'
import {last} from '../utilities/path'
import {getData} from '../reducers'

import AnyOfEditor from './AnyOf'
import ObjectEditor from './Object'
import ArrayEditor from './Array'
import BooleanEditor from './fields/Boolean'
import NumberEditor from './fields/Number'
import EnumEditor from './fields/Enum'
import NullEditor from './fields/Null'
import StringEditor from './fields/String'
import autoPopulating from './hoc/auto-populating'

const registeredEditors = {
  object: ObjectEditor,
  array: ArrayEditor,
  boolean: BooleanEditor,
  integer: NumberEditor,
  number: NumberEditor,
  enum: EnumEditor
}

const PropertyEditor = ({schema, data, title, description, path, requireds, expanded, canEditKey, canRemove}) => {
  if (schema['x-editor-visible'] === false) {
    return null
  }

  if (data == null) {
    return (
      <NullEditor
        schema={schema}
        title={title}
        description={description}
        path={path}
        canRemove={canRemove} />
    )
  }

  if (data === INTERNAL_ANY_OF) {
    return (
      <AnyOfEditor
        schema={schema}
        title={title}
        description={description}
        path={path} />
    )
  }

  if (schema.anyOf != null) {
    schema = match(schema.anyOf, data)
  }

  // TODO: handle non-matching data gracefully

  if (schema.allOf != null) {
    schema = merge(schema.allOf)
  }

  const type = getType(schema)
  const required = requireds != null && requireds.includes(last(path))
  const Component = registeredEditors[type] || StringEditor

  return (
    <Component
      schema={schema}
      data={data}
      title={title}
      description={description}
      path={path}
      required={required}
      canEditKey={canEditKey}
      canRemove={canRemove}
      expanded={expanded} />
  )
}

export default connect(
  (state, {path}) => ({
    data: getData(state, path)
  })
)(autoPopulating(PropertyEditor))
