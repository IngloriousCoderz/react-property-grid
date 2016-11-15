import React from 'react'
import {createStore} from 'redux'
import {createProvider} from 'react-redux-custom-store'
import deref from 'json-schema-deref-local'

import NAMESPACE from './constants/namespace'
import Root from './components/Root'
import rootReducer from './reducers'
import {init, exportData} from './actions'
import {importData, cleanup} from './utilities/data'
import './index.css'

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers').default
    store.replaceReducer(nextRootReducer)
  })
}

const Provider = createProvider(NAMESPACE)

const PropertyGrid = ({schema, data = {}, title = 'Properties', onChange}) => {
  store.dispatch(init(deref(schema), importData(data)))

  if (onChange != null) {
    store.subscribe(() => {
      const state = store.getState()
      if (state.dirty) {
        onChange(cleanup(state.data))
        store.dispatch(exportData())
      }
    })
  }

  return (
    <Provider store={store}>
      <Root title={title} onChange={onChange} />
    </Provider>
  )
}

export default PropertyGrid
