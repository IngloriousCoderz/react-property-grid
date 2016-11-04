import React from 'react'
import {connect} from 'react-redux'

import {dereference, getType, getDefaultForType} from '../utilities'
import ObjectEditor from './ObjectEditor'
import ArrayEditor from './ArrayEditor'
import PrimitiveEditor from './PrimitiveEditor'

const PropertyEditor = ({schema, data, key, path, rootSchema}) => {
  if (schema['!editor-visible'] === false) {
    return null
  }

  const derefSchema = dereference(schema, rootSchema)
  const type = getType(derefSchema)
  data = data || getDefaultForType(type)

  switch (type) {
    case 'object':
      return <ObjectEditor schema={derefSchema} data={data} key={key} path={path} />
    case 'array':
      return <ArrayEditor schema={derefSchema} data={data} key={key} path={path} />
    default:
      return <PrimitiveEditor schema={derefSchema} data={data} key={key} path={path} />
  }
}

export default connect(({rootSchema}) => ({rootSchema}))(PropertyEditor)
