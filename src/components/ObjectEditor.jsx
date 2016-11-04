import React from 'react'

import CaptionRow from './CaptionRow'
import PropertiesEditor from './PropertiesEditor'
import AdditionalPropertiesEditor from './AdditionalPropertiesEditor'
import AnyOfEditor from './AnyOfEditor'

const ObjectEditor = ({schema, data, key, path}) => {
  const subPath = `${path}.${key}`

  return (
    <div>
      <CaptionRow text={schema.title || key} summary={schema.description} path={path} />
      <PropertiesEditor schema={schema.properties} data={data} path={subPath} />
      <AdditionalPropertiesEditor schema={schema.additionalProperties} data={data} path={subPath} />
      <AnyOfEditor schema={schema.anyOf} data={data} path={subPath} />
    </div>
  )
}

export default ObjectEditor
