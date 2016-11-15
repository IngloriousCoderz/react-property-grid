var React = require('react')
var ReactDOM = require('react-dom')

var PropertyGrid = require('./src').default
var schema = require('./test/sample-schema.json')
var data = require('./test/sample-data.json')

ReactDOM.render(
  React.createElement(PropertyGrid, {schema, data, onChange: console.log}),
  document.getElementById('root')
)
