import React, { Component } from 'react';
import Form from 'react-json-editor'
import logo from './logo.svg';
import './App.css';
import schema from './layout-schema.json'

class App extends Component {
  onSubmit() {
    alert('hi!')
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Form schema={schema} onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default App
