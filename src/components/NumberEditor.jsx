import React from 'react'

import {input} from './styles'

const number = {
  textAlign: 'right'
}

const NumberEditor = ({schema, data, path, setData}) => <input type='number' value={data} onChange={event => setData(path, event.target.value)} style={{...input, ...number}} />

export default NumberEditor
