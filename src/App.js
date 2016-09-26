import React, { Component } from 'react'
import $ from 'jquery'
import 'kendo'
import 'kendo/css/web/kendo.common.css'
import 'kendo/css/web/kendo.fiori.css'
import {Splitter, TreeView} from 'kendo-ui-react'
import './index.css'
// import './form.css'
// import schema from './spreadsheet-schema.json'

/*const schema2 = {
  title: "Contact",
  description: "General contact info",
  type      : "object",
  properties: {
    name: {
      type: "string",
      title: "Name"
    },
    age: {
      type: "number",
      title: "Age",
      minimum: 0,
      maximum: 100
    },
    gender: {
      title: 'Gender',
      description: "Your sex",
      enum: [ "", "Male", "Female", "Apache Helicopter" ]
    },
    happy: {
      title: 'Happy',
      type: 'boolean'
    },
    contact: {
      title      : "Contact details",
      description: "How would you like to be contacted?",
      type       : "object",
      properties : {
        contactType: {
          title      : "Contact medium",
          description: "Please pick your preferred medium",
          enum: [ "", "Email", "Telephone", "Physical mail" ]
        }
      },
      oneOf: [
        {},
        {
          properties: {
            contactType: { enum: [ "Email" ] },
            email      : { type: "string", title: "Email address" }
          }
        },
        {
          properties: {
            contactType: { enum: [ "Telephone" ] },
            phoneNumber: { title: "Telephone number" }
          }
        },
        {
          properties: {
            contactType: { enum: [ "Physical mail" ] },
            address    : { title: "Street address" },
            postcode   : { title: "Post or area code" },
            state      : { title: "State or province" },
            country    : { title: "Country" }
          }
        }
      ],
      "x-hints": { form: { selector: "contactType" } }
    }
  }
}*/

window.$ = $

const splitterOptions = {
  orientation: 'vertical',
  panes: [
    { collapsible: true, size: '50%' },
    { collapsible: true, resizable: true }
  ]
}

const treeViewOptions = {
  dragAndDrop: true,
  dataSource: [
    {
      text: "Item 1",
      items: [
        { text: "Item 1.1" },
        { text: "Item 1.2" }
      ]
    },
    { text: "Item 2" }
  ]
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
