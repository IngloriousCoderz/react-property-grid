import React, { Component } from 'react'
import Form from 'react-json-editor'
import './form.css'
// import logo from './logo.svg';
// import './App.css';
import schema from './spreadsheet-schema.json'

const schema2 = {
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
}

class App extends Component {
  onSubmit(data) {
    console.log(data)
  }

  render() {
    return <Form schema={ schema } onSubmit={ this.onSubmit } />
  }
}

export default App
