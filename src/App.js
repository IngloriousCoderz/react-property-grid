import React, { Component } from 'react'

import './index.css'
import schema from './layout-schema.json'
import layout from './layout.json'
import LayoutEditor from './editors/layout-editor'

class App extends Component {
  render() {
    return (
      <LayoutEditor schema={schema} data={layout}></LayoutEditor>
    )
  }
}

export default App
