import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getType} from '../utilities/schema'
import {getDefaultForType} from '../utilities/data'
import {setValue} from '../actions'

const Adjustable = Enhanced => {
  class Adjustable extends Component {
    componentWillMount() {
      const {schema, data, path, setValue} = this.props
      if (data == null) {
        setValue(path, getDefaultForType(getType(schema)))
      }
    }

    render() {
      return <Enhanced {...this.props} />
    }
  }

  return connect(() => ({}), {setValue})(Adjustable)
}

export default Adjustable
