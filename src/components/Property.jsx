import React from 'react'

import {INTERNAL_ANY_OF} from '../utilities/data'
import {match, getType} from '../utilities/schema'
import {last} from '../utilities/path'
import AnyOfEditor from './AnyOf'
import ObjectEditor from './Object'
import ArrayEditor from './Array'
import FieldEditor from './Field'
import autoPopulating from './hoc/auto-populating'

const PropertyEditor = ({schema, data, title, path, requireds, canEditKey, canRemove, setValue}) => {
  if (schema['!editor-visible'] === false) {
    return null
  }

  if (data === INTERNAL_ANY_OF) {
    return <AnyOfEditor schema={schema} title={title} path={path} />
  }

  let subschema = schema
  if (subschema.anyOf != null) {
    subschema = match(subschema.anyOf, data)
  }

  const type = getType(subschema)
  const required = requireds != null && requireds.includes(last(path))

  let Component
  switch (type) {
    case 'object':
      Component = ObjectEditor
      break
    case 'array':
      Component = ArrayEditor
      break
    default:
      Component = FieldEditor
  }

  return <Component schema={subschema} data={data} title={title} path={path} required={required} canEditKey={canEditKey} canRemove={canRemove} />
}

export default autoPopulating(PropertyEditor)
