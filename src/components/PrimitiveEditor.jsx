import React from 'react'
import {connect} from 'react-redux'

import {getType} from '../utilities'
import {last, asciiTree} from '../utilities/path'
import BooleanEditor from './BooleanEditor'
import NumberEditor from './NumberEditor'
import EnumEditor from './EnumEditor'
import TextEditor from './TextEditor'
import {setData} from '../actions'
import {row, cell, buttonGroup, button} from './styles'

const field = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}

const PrimitiveEditor = ({schema, data, path, setData, canDelete}) => {
  const text = schema.title || last(path)
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

  return (
    <div style={row}>
      <div style={cell}>
        <span dangerouslySetInnerHTML={{__html: asciiTree(path)}} />{text}
      </div>
      <div style={cell}>
        <div style={buttonGroup}>
          {canDelete ? <div style={button} onClick={console.log}>&ndash;</div> : null}
        </div>
        <div style={field}>
          <Component schema={schema} data={data} path={path} setData={setData} />
        </div>
      </div>
    </div>
  )
}

export default connect(() => ({}), {setData})(PrimitiveEditor)
