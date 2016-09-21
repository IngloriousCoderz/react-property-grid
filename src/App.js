import React, { Component } from 'react';
import PropertyEditor from './PropertyEditor'
import logo from './logo.svg';
import './App.css';

const Types = {
  string: {
    required: 'boolean',
    defaultValue: 'string',
    editor: 'text'
  },
  array: {
    required: 'boolean',
    defaultValue: [],
    editor: 'list',
    of: 'any',
    // min: 'number',
    // max: 'number'
  }
}

Types.Binding = {
  name: { type: Types.string }
}

Types.SpreadsheetViewer = {
  properties: {
    name: { type: Types.string, required: true },
    bindings: { type: 'array', of: Types.Binding, required: false }
  }
}

Types.Root = {
  properties: {
    hello: {
      type: Types.string,
      required: true,
      defaultValue: 'world'
    },
    viewers: {
      type: Types.array,
      of: [Types.SpreadsheetViewer]
    }
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <PropertyEditor schema={schema} />
      </div>
    );
  }
}

export default App
