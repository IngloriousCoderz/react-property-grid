import React from 'react'
import {connect} from 'react-redux'

import withCaption from './hoc/with-caption'
import {setDefaults} from '../actions'
import {input} from './styles'

const AnyOfEditor = ({schema, title, path, setDefaults}) => (
  <select onChange={event => setDefaults(path, schema, parseInt(event.target.value, 10))} style={input}>
    <option>Choose a type</option>
    {schema.anyOf.map((item, index) => <option key={index} value={index}>{item.title || item.type}</option>)}
  </select>
)

export default withCaption({field: true})(connect(null, {setDefaults})(AnyOfEditor))
