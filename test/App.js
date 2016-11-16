var React = require('react')
var createStore = require('redux').createStore
var Provider = require('react-redux').Provider
var connect = require('react-redux').connect

var PropertyGrid = require('../src').default

var schema = require('./input/sample-schema.json')
var data = require('./input/sample-data.json')

var anotherSchema = require('./input/another-sample-schema.json')
var anotherData = require('./input/another-sample-data.json')

var initialState = {
  jsonschema: schema,
  jsondata: data
}

var reducer = (state, action) => {
  if (action.type === 'CHANGE') return {
    jsonschema: anotherSchema,
    jsondata: anotherData
  }
  return state
}

var store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

var ConnectedPropertyGrid = connect(function(state) {
  return {
    schema: state.jsonschema,
    data: state.jsondata
  }
})(PropertyGrid)

function App() {
  return React.createElement(Provider, {store: store},
    React.createElement('div', null,
      React.createElement(ConnectedPropertyGrid, {onChange: console.log}),
      React.createElement('button', {
        onClick: function() {
          store.dispatch({type: 'CHANGE'})
        }
      }, 'change')
    )
  )
}

module.exports = App
