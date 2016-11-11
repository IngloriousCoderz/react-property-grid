import React from 'react'

import {match, getType} from '../utilities/schema'
import {last} from '../utilities/path'
import ObjectEditor from './Object'
import ArrayEditor from './Array'
import FieldEditor from './Field'
import autoPopulating from './hoc/auto-populating'

const PropertyEditor = ({schema, data, title, path, requireds, canEditKey, canRemove, setValue}) => {
  if (schema['!editor-visible'] === false) {
    return null
  }

  if (schema.anyOf != null) {
    schema = match(schema.anyOf, data)
  }

  const type = getType(schema)
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

  return <Component schema={schema} data={data} title={title} path={path} required={required} canEditKey={canEditKey} canRemove={canRemove} />
}

export default autoPopulating(PropertyEditor)
