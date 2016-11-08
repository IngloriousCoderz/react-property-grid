import React from 'react'

import Summary from './Summary'
import PropertiesEditor from './PropertiesEditor'
import AdditionalPropertiesEditor from './AdditionalPropertiesEditor'
import AnyOfEditor from './AnyOfEditor'

const ObjectEditor = ({schema, data, title, path, canDelete}) => (
  <div>
    {title != null ? <Summary schema={schema} data={data} title={title} path={path} canDelete={canDelete} /> : null}
    <PropertiesEditor schema={schema.properties} data={data} path={path} />
    <AdditionalPropertiesEditor schema={schema.additionalProperties} data={data} path={path} />
    <AnyOfEditor schema={schema.anyOf} data={data} path={path} />
  </div>
)

export default ObjectEditor
