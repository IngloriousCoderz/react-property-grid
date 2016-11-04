import React from 'react'

import CaptionRow from './CaptionRow'
import PropertyEditor from './PropertyEditor'

const ArrayEditor = ({schema, data, key, path}) => {
  const subPath = `${path}.${key}`

  return (
    <div>
      <CaptionRow text={schema.title || key} summary={schema.description} path={path} />
      {data.map((item, index) => <PropertyEditor schema={schema.items} data={item} key={`${schema.title || key}[${index}]`} path={subPath} />)}
    </div>
  )
}

export default ArrayEditor
