import React from 'react'

import {input} from './styles'

const TextEditor = ({schema, data, path, setData}) => <input type='text' value={data} onChange={event => setData(path, event.target.value)} style={input} />

export default TextEditor
