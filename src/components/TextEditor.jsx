import React from 'react'
import {Debounce} from 'react-throttle'

import {input} from './styles'

const TextEditor = ({schema, data, path, setValue}) => (
  <Debounce time='500' handler='onChange'>
    <input type='text'
      defaultValue={data}
      onChange={event => setValue(path, event.target.value)}
      style={input} />
  </Debounce>
)

export default TextEditor
