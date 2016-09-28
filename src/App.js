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

window.$ = $

const splitterOptions = {
  orientation: 'vertical',
  panes: [
    { collapsible: true, size: '50%' },
    { collapsible: true, resizable: true }
  ]
}

const onSelect = event => console.log(event.sender.dataItem(event.node))

const treeViewOptions = {
  dragAndDrop: true,
  dataSource: schema2TreeDS(schema, layout),
  select: onSelect
}

class App extends Component {
  render() {
    return (
      <Splitter id='property-editor' options={splitterOptions}>
        <TreeView options={treeViewOptions}></TreeView>
        <div>Div2</div>
      </Splitter>
    )
  }
}

export default App
