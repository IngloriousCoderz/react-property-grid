import React from 'react'

import withCaption from './hoc/with-caption'
import {label} from './styles'

const summary = {
  ...label,
  color: 'grey'
}

const Summary = ({schema, data, title, description, path}) => <div style={summary}>{description}</div>

export default withCaption({field: false})(Summary)
