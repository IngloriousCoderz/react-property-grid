import React, {Component} from 'react'
import {connect} from 'react-redux-custom-store'

import NAMESPACE from '../../constants/namespace'
import {defaults} from '../../utilities/schema'
import {setValue} from '../../actions'

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component'

const autoPopulating = WrappedComponent => {
  class AutoPopulating extends Component {
    componentWillMount() {
      const {schema, data, path, setValue} = this.props

      if (data == null) {
        setValue(path, defaults(schema))
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  AutoPopulating.displayName = `AutoPopulating${getDisplayName(WrappedComponent)}`

  return connect(null, {setValue})(AutoPopulating, NAMESPACE)
}

export default autoPopulating
