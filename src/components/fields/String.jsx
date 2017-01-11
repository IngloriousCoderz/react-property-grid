import React from 'react'
import {connect} from 'react-redux'

import withCaption from '../hoc/with-caption'
import TextEditor from './Text'
import {setValue} from '../../actions'

const StringEditor = ({schema, data, path, setValue}) => (
  <TextEditor schema={schema} data={data} path={path} setValue={setValue} />
)

export default withCaption({field: true})(connect(null, {setValue})(StringEditor))
