import React from 'react'

import {input} from './styles'

const boolean = {
  textAlign: 'center',
  verticalAlign: 'middle'
}

const BooleanEditor = ({schema, data, path, setData}) => <input type='checkbox' checked={data} onChange={event => setData(path, event.target.checked)} style={{...input, ...boolean}} />

export default BooleanEditor
