import React from 'react'
import {connect} from 'react-redux'

import {matchSchema} from '../utilities/schema'
import {INTERNAL_ID} from '../utilities/data'
import {subpath, last} from '../utilities/path'
import PropertyEditor from './PropertyEditor'

const AdditionalPropertiesEditor = ({schema, data, path, rootSchema}) => {
  if (schema == null || schema === false || data == null) {
    return null
  }

  return (
    <div>
      {Object.keys(data).filter(key => key !== INTERNAL_ID).map(key => {
        const sub = subpath(path, key)
        const title = last(sub)
        return <PropertyEditor key={data[key].__id || sub} schema={matchSchema(schema.anyOf || [schema], data[key], rootSchema)} data={data[key]} title={title} path={sub} canEditKey={true} canRemove={true} />
      })}
    </div>
  )
}

export default connect(({rootSchema}) => ({rootSchema}))(AdditionalPropertiesEditor)
