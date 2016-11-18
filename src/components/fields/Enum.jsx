import React from 'react'
import {connect} from 'react-redux-custom-store'

import NAMESPACE from '../../constants/namespace'
import withCaption from '../hoc/with-caption'
import {setValue} from '../../actions'
import {input, label} from '../styles'

const EnumEditor = ({schema, data, path, setValue}) => (
  schema.enum.length > 1
    ? <select value={data} onChange={event => setValue(path, event.target.value)} style={input}>
        {schema.enum.map(item => <option key={item} value={item}>{item}</option>)}
      </select>
    : <div style={input}>
        <span style={label}>{schema.enum[0]}</span>
      </div>
)

export default withCaption({field: true})(connect(null, {setValue})(EnumEditor, NAMESPACE))
