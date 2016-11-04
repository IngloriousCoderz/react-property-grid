import React from 'react'
import {connect} from 'react-redux'

import {matchSchema} from '../utilities'
import PropertyEditor from './PropertyEditor'

const AnyOfEditor = ({schema, data, path, rootSchema}) => {
  if (schema == null || data == null) {
    return null
  }

  const selectedSchema = matchSchema(schema, data, rootSchema)
  return <PropertyEditor schema={selectedSchema} data={data} path={path} />
}

export default connect(({rootSchema}) => ({rootSchema}))(AnyOfEditor)
