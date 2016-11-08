import React from 'react'

import {last, subpath} from '../utilities/path'
import Summary from './Summary'
import PropertyEditor from './PropertyEditor'

const ArrayEditor = ({schema, data, title, path, canDelete}) => {
  const canDeleteChildren = schema.additionalItems !== false
  return (
    <div>
      <Summary schema={schema} data={data} title={title} path={path} canDelete={canDelete} canAdd={true} />
      {data.map((item, index) => {
        const sub = subpath(path, index)
        const title = schema.title || last(sub)
        return <PropertyEditor key={sub} schema={schema.items} data={item} title={`${title}[${index}]`} path={sub} canDelete={canDeleteChildren} />
      })}
    </div>
  )
}

export default ArrayEditor
