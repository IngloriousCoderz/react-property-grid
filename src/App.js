import React, { Component } from 'react'
import $ from 'jquery'
import 'kendo'
import 'kendo/css/web/kendo.common.css'
import 'kendo/css/web/kendo.fiori.css'
import {Splitter, TreeView} from 'kendo-ui-react'
import './index.css'
// import schema from './spreadsheet-schema.json'
import layout from './minimal-layout.json'

window.$ = $

const splitterOptions = {
  orientation: 'vertical',
  panes: [
    { collapsible: true, size: '50%' },
    { collapsible: true, resizable: true }
  ]
}

const adaptLayout = layout => {
  return [{
    "id": "server",
    "text": "Server properties"
  }, {
    "id": "styles",
    "text": "Default styles"
  }, {
    "id": "viewers",
    "text": "Viewers",
    "items": [{
      "id": "MarketsGrid",
      "text": "MarketsGrid",
      "items": [{
        "id": "bindings",
        "text": "Bindings",
        "items": [{
          "id": "Binding1",
          "text": "Binding1",
          "items": [{
            "id": "columns",
            "text": "Column definitions",
            "items": []
          }]
        }]
      }]
    }]
  }]
}

const onSelect = event => console.log(event.sender.dataItem(event.node))

const treeViewOptions = {
  dragAndDrop: true,
  dataSource: adaptLayout(layout),
  // [{
  //     id: 'viewers',
  //     text: "Viewers",
  //     expanded: true,
  //     items: [{
  //       id: 'viewer1',
  //       text: "Viewer1",
  //       expanded: true,
  //       items: [{
  //         text: "Binding1.1"
  //       }]
  //     }, {
  //       text: "Viewer2",
  //       expanded: true,
  //       items: [{
  //         text: "Binding2.1"
  //       }, {
  //         text: "Binding2.2"
  //       }]
  //     }]
  //   }, {
  //     text: "Styles"
  // }],
  schema: {
    model: {
      id: '',
      hasChildren: function(item) { return },
      children: function() { return }
    },
    parse: {}
  },
  select: onSelect
}

class App extends Component {
  render() {
    return (
      <Splitter id='property-editor' options={splitterOptions}>
        <TreeView options={treeViewOptions}></TreeView>
        <div>Div2</div>
      </Splitter>)
    }
  }

  export default App
