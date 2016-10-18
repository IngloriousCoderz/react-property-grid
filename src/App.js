import React, { Component } from 'react'
import $ from 'jquery'
import 'kendo'
import 'kendo/css/web/kendo.common.css'
import 'kendo/css/web/kendo.fiori.css'
import {Splitter, TreeView} from 'kendo-ui-react'
import './index.css'
import schema from './layout-schema.json'
import layout from './minimal-layout.json'
import { schema2TreeDS } from './schema-utils'
import LayoutEditor from './editors/layout-editor'

window.$ = $

const splitterOptions = {
  orientation: 'vertical',
  panes: [
    { collapsible: true, size: '50%' },
    { collapsible: true, resizable: true }
  ]
}

const onSelect = event => console.log(event.sender.dataItem(event.node))

const layoutEditorOptions = {
  schema: schema,
  dataSource: layout,
  select: onSelect
}

class App extends Component {
  render() {
    return (
      <LayoutEditor options={layoutEditorOptions} id='property-editor'></LayoutEditor>
    )
  }
}

export default App
