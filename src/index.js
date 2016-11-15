import React, {Component} from 'react'
import {createStore} from 'redux'
import {createProvider} from 'react-redux-custom-store'
import deref from 'json-schema-deref-local'

import NAMESPACE from './constants/namespace'
import Root from './components/Root'
import rootReducer from './reducers'
import {init, sync} from './actions'
import {importData, cleanup} from './utilities/data'
import './index.css'

const Provider = createProvider(NAMESPACE)

class PropertyGrid extends Component {
  constructor(props) {
    super(props)

    const {schema, data, onChange} = props

    const store = this.store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

    if (module.hot) {
      module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers').default
        store.replaceReducer(nextRootReducer)
      })
    }
    store.dispatch(init(deref(schema), importData(data)))

    if (onChange != null) {
      store.subscribe(() => {
        const state = store.getState()
        if (state.dirty) {
          onChange(cleanup(state.data))
          store.dispatch(sync())
        }
      })
    }
  }

  render() {
    const {title = 'Properties', onChange} = this.props
    return (
      <Provider store={this.store}>
        <Root title={title} onChange={onChange} />
      </Provider>
    )
  }
}

export default PropertyGrid
