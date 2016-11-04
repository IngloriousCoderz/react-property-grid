import React from 'react'
import {connect} from 'react-redux'

import {matchSchema} from '../utilities'
import PropertyEditor from './PropertyEditor'

const AdditionalPropertiesEditor = ({schema, data, path, rootSchema}) => {
  if (schema == null || schema === false || data == null) {
    return null
  }

  return (
    <div>
      {Object.keys(data).map(key => {
      if (schema.$ref == null) {
        schema = matchSchema(schema.anyOf || [schema], data[key], rootSchema)
      }
      return <PropertyEditor schema={schema} data={data[key]} key={key} path={path} />
    })}
    </div>
  )
}

export default connect(({rootSchema}) => ({rootSchema}))(AdditionalPropertiesEditor)
