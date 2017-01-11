import React, {Component} from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import Root from './components/Root'
import rootReducer from './reducers'
import {init, sync} from './actions'
import {cleanup} from './utilities/data'
import './index.css'

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

    if (onChange != null) {
      store.subscribe(() => {
        const state = store.getState()
        if (state.dirty) {
          onChange(cleanup(state.data))
          store.dispatch(sync())
        }
      })
    }

    store.dispatch(init(schema, data))
  }

  componentWillUpdate({schema, data}) {
    this.store.dispatch(init(schema, data))
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
