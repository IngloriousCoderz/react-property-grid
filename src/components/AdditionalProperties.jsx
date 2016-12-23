import React from 'react'

import {INTERNAL_ID} from '../utilities/data'
import {child} from '../utilities/path'
import PropertyEditor from './Property'

const AdditionalPropertiesEditor = ({schema, data, path}) => {
  if (schema == null || schema === false || data == null) {
    return null
  }

  return (
    <div>
      {Object.keys(data).filter(key => key !== INTERNAL_ID).map(key => {
        const childPath = child(path, key)
        return (
          <PropertyEditor
            key={data[key].__id || childPath}
            schema={schema}
            data={data[key]}
            title={key}
            description={schema.description}
            path={childPath}
            canEditKey={true}
            canRemove={true} />
        )
      })}
    </div>
  )
}

export default AdditionalPropertiesEditor
