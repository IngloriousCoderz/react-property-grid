import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import deref from 'json-schema-deref-local'

import RootEditor from './components'
import rootReducer from './reducers'
import {importData, exportData} from './utilities/data'
import './index.css'

const PropertyGrid = ({schema, data = {}, title = 'Properties', onChange}) => {
  const store = createStore(rootReducer, {rootSchema: deref(schema), data: importData(data)}, window.devToolsExtension ? window.devToolsExtension() : f => f)

  if (onChange != null) {
    store.subscribe(() => onChange(exportData(store.getState().data)))
  }

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return (
    <Provider store={store}>
      <RootEditor title={title} onChange={onChange} />
    </Provider>
  )
}

import ReactDOM from 'react-dom'
import schema from '../test/layout-schema.json'
import layout from '../test/layout.json'

ReactDOM.render(
  <PropertyGrid schema={schema} data={layout} onChange={console.log} />,
  document.getElementById('root')
)

export default PropertyGrid
