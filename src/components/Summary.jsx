import React from 'react'

import withCaption from './hoc/with-caption'
import {label} from './styles'

const description = {
  ...label,
  color: 'grey'
}

const Summary = ({schema, data, title, path}) => <div style={description}>{schema.description}</div>

export default withCaption({field: false})(Summary)
