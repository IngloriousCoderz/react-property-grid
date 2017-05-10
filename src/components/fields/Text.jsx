import React from 'react'
// import {Debounce} from 'react-throttle'

import {input} from '../styles'

const TextEditor = ({schema, data, path, setValue}) => (
  // <Debounce time='500' handler='onChange'>
    <input type='text'
      minLength={schema.minLength}
      maxLength={schema.maxLength}
      pattern={schema.pattern}
      defaultValue={data}
      // onChange={event => setValue(path, event.target.value)}
      onBlur={event => {
        const value = event.target.value
        if (value !== data) {
          setValue(path, value)
        }
      }}
      style={input} />
  // </Debounce>
)

export default TextEditor
