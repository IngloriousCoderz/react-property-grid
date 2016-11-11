import React from 'react'

import withCaption from './with-caption'

const description = {
  color: 'grey'
}

const Summary = ({schema, data, title, path}) => <span style={description}>{schema.description}</span>

export default withCaption({field: false})(Summary)
