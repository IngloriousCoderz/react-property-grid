import React, {Component} from 'react'

class PropertyEditor extends Component {
    render() {
      return (
        <form>
          <input value={this.props.schema} />
        </form>
      )
    }
}

export default PropertyEditor
