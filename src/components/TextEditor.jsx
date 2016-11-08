import React from 'react'

const TextEditor = ({schema, data, path, style, setData}) => <input type='text' value={data} onChange={event => setData(path, event.target.value)} style={style} />

export default TextEditor
