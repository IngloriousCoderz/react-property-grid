import React from 'react'
import {connect} from 'react-redux'

import {getType} from '../utilities'
import WithCaption from './WithCaption'
import BooleanEditor from './BooleanEditor'
import NumberEditor from './NumberEditor'
import EnumEditor from './EnumEditor'
import TextEditor from './TextEditor'
import {setValue, removeItem} from '../actions'

const PrimitiveEditor = ({schema, data, path, required, setValue, removeItem}) => {
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

export default connect(() => ({}), {setValue, removeItem})(WithCaption({field: true})(PrimitiveEditor))
