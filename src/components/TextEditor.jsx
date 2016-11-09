import React from 'react'
import {Debounce} from 'react-throttle'

import {input} from './styles'

const TextEditor = ({schema, data, path, setData}) => (
  <Debounce time='200' handler='onChange'>
    <input type='text' defaultValue={data} onChange={event => setData(path, event.target.value)} style={input} />
  </Debounce>
)

export default TextEditor
