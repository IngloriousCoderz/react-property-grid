import React, {Component} from 'react'
import {connect} from 'react-redux'

import {match} from '../../utilities/schema'
import {setDefaults} from '../../actions'

const getDisplayName = Enhanced => Enhanced.displayName || Enhanced.name || 'Component'

const autoPopulating = Enhanced => {
  class AutoPopulating extends Component {
    componentWillMount() {
      const {schema, data, path, setDefaults} = this.props

      if (data == null && (schema.anyOf == null || !match(schema.anyOf, data))) {
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
