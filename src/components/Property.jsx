import React from 'react'

import {INTERNAL_ANY_OF} from '../utilities/data'
import {match, getType} from '../utilities/schema'
import {last} from '../utilities/path'
import AnyOfEditor from './AnyOf'
import ObjectEditor from './Object'
import ArrayEditor from './Array'
import BooleanEditor from './fields/Boolean'
import NumberEditor from './fields/Number'
import EnumEditor from './fields/Enum'
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

const PropertyEditor = ({schema, data, title, path, requireds, expanded, canEditKey, canRemove}) => {
  if (schema['!editor-visible'] === false) {
    return null
  }

  if (data === INTERNAL_ANY_OF) {
    return <AnyOfEditor schema={schema} title={title} path={path} />
  }

  if (schema.anyOf != null) {
    schema = match(schema.anyOf, data)
  }

  const type = getType(schema)
  const required = requireds != null && requireds.includes(last(path))
  const Component = registeredEditors[type] || StringEditor

  return (
    <Component
      schema={schema}
      data={data}
      title={title}
      path={path}
      required={required}
      canEditKey={canEditKey}
      canRemove={canRemove}
      expanded={expanded} />
  )
}

export default autoPopulating(PropertyEditor)
