import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import RootEditor from './components/RootEditor'
import rootReducer from './reducers'
import {clone} from './utilities'

import schema from './layout-schema.json'
import layout from './minimal-layout.json'

const store = createStore(rootReducer, {rootSchema: schema, data: clone(layout)}, window.devToolsExtension ? window.devToolsExtension() : f => f)

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers').default
    store.replaceReducer(nextRootReducer)
  })
}

const App = () => (
  <Provider store={store}>
    <RootEditor />
  </Provider>
)

export default App
