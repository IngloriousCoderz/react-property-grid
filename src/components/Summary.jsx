import React from 'react'

import WithCaption from './WithCaption'

const description = {
  color: 'grey'
}

const Summary = ({schema, data, title, path}) => <span style={description}>{schema.description}</span>

export default WithCaption(Summary)
