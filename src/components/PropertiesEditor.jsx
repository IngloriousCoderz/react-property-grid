import React from 'react'

import PropertyEditor from './PropertyEditor'

const PropertiesEditor = ({schema = {}, data, path = ''}) => (
  <div>
    {Object.keys(schema).map(key => <PropertyEditor key={key} schema={schema[key]} data={data[key]} path={`${path}.${key}`} />)}
  </div>
)

export default PropertiesEditor
