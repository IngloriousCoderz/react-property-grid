import React, {Component} from 'react'
import {connect} from 'react-redux'

import {setDefaults} from '../../actions'

const getDisplayName = Enhanced => Enhanced.displayName || Enhanced.name || 'Component'

const autoPopulating = Enhanced => {
  class AutoPopulating extends Component {
    componentWillMount() {
      const {schema, data, path, setDefaults} = this.props

      if (data == null) {
        setDefaults(path, schema)
      }
    }

    render() {
      return <Enhanced {...this.props} />
    }
  }

  AutoPopulating.displayName = `AutoPopulating(${getDisplayName(Enhanced)})`

  return connect(null, {setDefaults})(AutoPopulating)
}

export default autoPopulating
