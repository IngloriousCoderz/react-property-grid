import React from 'react'
import {connect} from 'react-redux'

import {matchSchema} from '../utilities'
import PropertyEditor from './PropertyEditor'

const AnyOfEditor = ({schemas, data, path, rootSchema}) => {
  if (schemas == null || data == null) {
    return null
  }

  const schema = matchSchema(schemas, data, rootSchema)
  return <PropertyEditor schema={schema} data={data} path={path} canRemove={true} />
}

export default connect(({rootSchema}) => ({rootSchema}))(AnyOfEditor)
