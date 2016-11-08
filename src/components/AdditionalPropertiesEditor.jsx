import React from 'react'
import {connect} from 'react-redux'

import {matchSchema} from '../utilities'
import {subpath, last} from '../utilities/path'
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
        const sub = subpath(path, key)
        const title = schema.title || last(sub)
        return <PropertyEditor key={key} schema={schema} data={data[key]} title={title} path={sub} canRemove={true} />
      })}
    </div>
  )
}

export default connect(({rootSchema}) => ({rootSchema}))(AdditionalPropertiesEditor)
