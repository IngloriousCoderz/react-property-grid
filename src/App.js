import React, { Component } from 'react'
import kendo from 'kendo'
import $ from 'jquery'
import k from 'kendo-ui-react'
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

class App extends Component {
  render() {
    return (<div>
      <div>Hello!</div>
      <k.Splitter options={{
        orientation: 'horizontal',
        panes: [
          { collapsible: false, size: '300px' },
          { resizable: true }
        ]}}>
          <div>Div1</div>
          <div>Div2</div>
        </k.Splitter>
    </div>)
  }
}

export default App
