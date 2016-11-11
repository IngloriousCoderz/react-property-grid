import React from 'react'

import {child} from '../utilities/path'
import PropertyEditor from './Property'

const PropertiesEditor = ({schema = {}, data, path, requireds}) => (
  <div>
    {Object.keys(schema).map(key => {
      const childPath = child(path, key)
      return <PropertyEditor key={key} schema={schema[key]} data={data[key]} title={schema[key].title || key} path={childPath} requireds={requireds} />
    })}
  </div>
)

export default PropertiesEditor
