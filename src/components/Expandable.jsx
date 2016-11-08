import React, {Component} from 'react'

const Expandable = Enhanced => class Expandable extends Component {
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
    return <Enhanced expanded={this.state.expanded} toggleExpanded={this.toggleExpanded} {...this.props}/>
  }
}

export default Expandable
