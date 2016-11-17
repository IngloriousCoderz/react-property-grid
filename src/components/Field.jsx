import React from 'react'

import {getType} from '../utilities/schema'
import BooleanEditor from './fields/Boolean'
import NumberEditor from './fields/Number'
import EnumEditor from './fields/Enum'
import StringEditor from './fields/String'
import withCaption from './hoc/with-caption'

const FieldEditor = ({schema, data, path, required}) => {
  const type = getType(schema)

  let Component
  switch (type) {
    case 'boolean':
      Component = BooleanEditor
      break
    case 'integer':
    case 'number':
      Component = NumberEditor
      break
    case 'enum':
      Component = EnumEditor
      break
    default:
      Component = StringEditor
  }

  return <Component schema={schema} data={data} path={path} required={required} />
}

export default withCaption({field: true})(FieldEditor)
