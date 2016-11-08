import React from 'react'

import CaptionRow from './CaptionRow'
import PropertiesEditor from './PropertiesEditor'
import AdditionalPropertiesEditor from './AdditionalPropertiesEditor'
import AnyOfEditor from './AnyOfEditor'

const ObjectEditor = ({schema, data, title, path, canDelete}) => {
  return (
    <div>
      <CaptionRow schema={schema} data={data} title={title} path={path} canDelete={canDelete} />
      <PropertiesEditor schema={schema.properties} data={data} path={path} />
      <AdditionalPropertiesEditor schema={schema.additionalProperties} data={data} path={path} />
      <AnyOfEditor schema={schema.anyOf} data={data} path={path} />
    </div>
  )
}

export default ObjectEditor
