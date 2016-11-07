import React from 'react'

import {last, subpath} from '../utilities/path'
import CaptionRow from './CaptionRow'
import PropertyEditor from './PropertyEditor'

const ArrayEditor = ({schema, data, title, path}) => {
  return (
    <div>
      <CaptionRow schema={schema} data={data} title={title} path={path} />
      {data.map((item, index) => {
        const sub = subpath(path, index)
        const title = schema.title || last(sub)
        return <PropertyEditor key={sub} schema={schema.items} data={item} title={`${title}[${index}]`} path={sub} />
      })}
    </div>
  )
}

export default ArrayEditor
