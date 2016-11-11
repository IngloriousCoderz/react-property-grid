import React from 'react'

import {matchSchema} from '../utilities/schema'
import {INTERNAL_ID} from '../utilities/data'
import {child} from '../utilities/path'
import PropertyEditor from './PropertyEditor'

const AdditionalPropertiesEditor = ({schema, data, path}) => {
  if (schema == null || schema === false || data == null) {
    return null
  }

  return (
    <div>
      {Object.keys(data).filter(key => key !== INTERNAL_ID).map(key => {
        const childPath = child(path, key)
        return <PropertyEditor key={data[key].__id || childPath} schema={schema.anyOf ? matchSchema(schema.anyOf, data[key]) : schema} data={data[key]} title={key} path={childPath} canEditKey={true} canRemove={true} />
      })}
    </div>
  )
}

export default AdditionalPropertiesEditor
