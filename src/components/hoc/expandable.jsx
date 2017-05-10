import React, {Component} from 'react'

const getDisplayName = Enhanced => Enhanced.displayName || Enhanced.name || 'Component'

const expandable = Enhanced => {
  class Expandable extends Component {
    state = {
      expanded: this.props.expanded || false
    }

    toggleExpanded = () => {
      this.setState({expanded: !this.state.expanded})
    }

    render() {
      const {expanded, ...rest} = this.props // eslint-disable-line no-unused-vars
      return <Enhanced expanded={this.state.expanded} toggleExpanded={this.toggleExpanded} {...rest} />
    }
  }

  Expandable.displayName = `Expandable(${getDisplayName(Enhanced)})`

  return Expandable
}

export default expandable
