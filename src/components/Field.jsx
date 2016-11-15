import React from 'react'
import {connect} from 'react-redux-custom-store'

import NAMESPACE from '../constants/namespace'
import {getType} from '../utilities/schema'
import BooleanEditor from './fields/Boolean'
import NumberEditor from './fields/Number'
import EnumEditor from './fields/Enum'
import TextEditor from './fields/Text'
import withCaption from './hoc/with-caption'
import {setValue, removeItem} from '../actions'

const FieldEditor = ({schema, data, path, required, setValue, removeItem}) => {
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
      Component = TextEditor
  }

  return <Component schema={schema} data={data} path={path} required={required} setValue={setValue} removeItem={removeItem} />
}

export default connect(null, {setValue, removeItem})(withCaption({field: true})(FieldEditor), NAMESPACE)
