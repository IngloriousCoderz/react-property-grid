import React from 'react'

import {last, subpath} from '../utilities/path'
import PropertyEditor from './PropertyEditor'

const PropertiesEditor = ({schema = {}, data, path, requireds}) => (
  <div>
    {Object.keys(schema).map(key => {
      const sub = subpath(path, key)
      const title = schema[key].title || last(sub)
        return <PropertyEditor key={key} schema={schema[key]} data={data[key]} title={title} path={sub} requireds={requireds} />
    })}
  </div>
)

export default PropertiesEditor
