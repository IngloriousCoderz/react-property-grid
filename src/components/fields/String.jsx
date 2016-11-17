import React from 'react'
import {connect} from 'react-redux-custom-store'

import NAMESPACE from '../../constants/namespace'
import TextEditor from './Text'
import {setValue} from '../../actions'

const StringEditor = ({schema, data, path, setValue}) => (
  <TextEditor schema={schema} data={data} path={path} setValue={setValue} />
)

export default connect(null, {setValue})(StringEditor, NAMESPACE)
