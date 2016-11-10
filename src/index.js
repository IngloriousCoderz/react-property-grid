import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import deref from 'json-schema-deref-local'

import RootEditor from './components'
import rootReducer from './reducers'
import {clone} from './utilities'
import './index.css'

const PropertyGrid = ({schema, data, title = 'Properties'}) => {
  const store = createStore(rootReducer, {rootSchema: deref(schema), data: clone(data)}, window.devToolsExtension ? window.devToolsExtension() : f => f)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return (
    <Provider store={store}>
      <RootEditor />
    </Provider>
  )
}

import ReactDOM from 'react-dom'
import schema from './layout-schema.json'
import layout from './layout.json'

ReactDOM.render(
  <PropertyGrid schema={schema} data={layout} />,
  document.getElementById('root')
)

export default PropertyGrid
