import React, {Component} from 'react'

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component'

const expandable = WrappedComponent => {
  class Expandable extends Component {
    constructor(props) {
      super(props)
      this.state = {
        expanded: false
      }
      this.toggleExpanded = this.toggleExpanded.bind(this)
    }

    toggleExpanded() {
      this.setState({expanded: !this.state.expanded})
    }

    render() {
      return <WrappedComponent expanded={this.state.expanded} toggleExpanded={this.toggleExpanded} {...this.props}/>
    }
  }

  Expandable.displayName = `Expandable${getDisplayName(WrappedComponent)}`

  return Expandable
}

export default expandable
