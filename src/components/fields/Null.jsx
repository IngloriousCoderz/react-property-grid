import React from 'react'

import withCaption from '../hoc/with-caption'
import {input} from '../styles'

const gnull = {
  ...input,
  fontStyle: 'italic',
  color: 'grey'
}

const NullEditor = () => (
  <div style={gnull}>(null)</div>
)

export default withCaption({field: true})(NullEditor)
