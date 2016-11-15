import React, {Component} from 'react'
import {connect} from 'react-redux-custom-store'

import NAMESPACE from '../../constants/namespace'
import {setDefaults} from '../../actions'

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component'

const autoPopulating = WrappedComponent => {
  class AutoPopulating extends Component {
    componentWillMount() {
      const {schema, data, path, setDefaults} = this.props

      if (data == null) {
        setDefaults(path, schema)
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  AutoPopulating.displayName = `AutoPopulating${getDisplayName(WrappedComponent)}`

  return connect(null, {setDefaults})(AutoPopulating, NAMESPACE)
}

export default autoPopulating
