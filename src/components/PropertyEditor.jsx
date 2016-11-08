import React from 'react'
import {connect} from 'react-redux'

import {dereference, getType, getDefaultForType} from '../utilities'
import ObjectEditor from './ObjectEditor'
import ArrayEditor from './ArrayEditor'
import PrimitiveEditor from './PrimitiveEditor'

const PropertyEditor = ({schema, data, title, path, rootSchema, canDelete}) => {
  if (schema['!editor-visible'] === false) {
    return null
  }

  const derefSchema = dereference(schema, rootSchema)
  const type = getType(derefSchema)
  data = data || getDefaultForType(type)

  let Component

  switch (type) {
    case 'object':
      Component = ObjectEditor
      break
    case 'array':
      Component = ArrayEditor
      break
    default:
      Component = PrimitiveEditor
  }

  return <Component schema={derefSchema} data={data} title={title} path={path} canDelete={canDelete} />
}

export default connect(({rootSchema}) => ({rootSchema}))(PropertyEditor)
