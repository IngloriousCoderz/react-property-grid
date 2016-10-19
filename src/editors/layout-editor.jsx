import React from 'react'
import '../utilities/object.js'
import {jsonPathToValue} from '../utilities/json.js'

const divIndentStyle = {
  marginLeft: 5
}

class LayoutEditor extends React.Component {

  /*----------------------------------------------------------------------------*/
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    const {schema, dataSource} = this.props.options
    // const derefSchema = deref(schema)
    const properties = this.renderProperties(schema.properties, dataSource)
    return (
      <div onClick={this.handleClick}>{properties}</div>
    )
  }

  handleClick() {
    alert("Click")
  }

  /*----------------------------------------------------------------------------*/
  renderProperties(properties, data) {
    try {
      if (properties != null) {
        return Object.keys(properties).map((propertyKey) => {
          const rendered = this.renderProperty(properties[propertyKey], data[propertyKey])
          return rendered
        })
      } else {
        return null
      }
    } catch (e) {
      debugger
    }
  }

  renderAdditionalProperties(property, data) {
    if (property == null || property === false || data == null)
      return null
    if (property.anyOf != null) {
      debugger
      return Object.keys(data).map((propertyKey) => {

        // For now skip primitive types
        if (data[propertyKey].type == null) {
          return null
        }

        // Select matching schema, based on (by convention) type attribute
        let selectedSchema = property.anyOf.filter(p => {
          p = this.dereference(p)
          return p.properties.type.enum.includes(data[propertyKey].type)
        })[0]

        selectedSchema = this.dereference(selectedSchema)
        const rendered = this.renderProperty(selectedSchema, data[propertyKey], propertyKey)
        return rendered
      })
    } else {
      return Object.keys(data).map((propertyKey) => {
        const rendered = this.renderProperty(property, data[propertyKey], propertyKey)
        return rendered
      })
    }
  }

  renderProperty(property, value, propertyKey) {
    const key = propertyKey != null
      ? propertyKey
      : property.title
    const title = key
    const isArray = property.type === 'array'
    const isObject = property.type === 'object' || property.type == null
    const isValue = property.type != null && !isArray && !isObject
    let rendered = null

    if (isValue) {
      rendered = this.renderPrimitiveProperty(property, value)
    } else if (isObject) {
      const objectRendered = this.renderObjectProperty(property, value)
      rendered = (
        <div style={divIndentStyle} key={key + 'Property' + Math.random()}>
          {objectRendered.properties}
          {objectRendered.additionalProperties}
        </div>
      )
    } else if (isArray) {
      rendered = (
        <div style={divIndentStyle} key={key + 'Property' + Math.random()}>
          {this.renderArrayProperty(property, value)}
        </div>
      )
    }

    return (
      <div style={divIndentStyle} key={key + 'Property' + Math.random()}>
        <div style={{
          fontWeight: 'bold'
        }}>
          {title}
        </div>
        <div>
          {rendered}
        </div>
      </div>
    )
  }

  renderObjectProperty(property, value) {
    let rendered = {}

    property = this.dereference(property)

    if (property.properties != null) {
      rendered.properties = this.renderProperties(property.properties, value)
    }
    if (property.additionalProperties != null) {
      rendered.additionalProperties = this.renderAdditionalProperties(property.additionalProperties, value)
    }
    return rendered
  }

  renderArrayProperty(property, value) {
    const rendered = value.map((item) => {
      return this.renderProperty(property.items, item)
    })
    return rendered
  }

  renderPrimitiveProperty(property, value) {
    const key = property.title
    const title = property.title
    return (
      <div style={divIndentStyle} key={key + 'Property' + Math.random()}>
        <div style={{
          fontWeight: 'bold'
        }}>
          {title}
        </div>
        <div>
          {value}
        </div>
      </div>
    )
  }

  dereference(property) {
    const {schema} = this.props.options
    const ref = property['$ref']
    if (ref != null) {
      const refPath = ref.replace('#/', '').replace('/', '.')
      const referencedSchema = jsonPathToValue(schema, refPath)
      return referencedSchema
    } else {
      return property
    }
  }
}

/*----------------------------------------------------------------------------*/
LayoutEditor.propTypes = {}
LayoutEditor.defaultProps = {}

export default LayoutEditor
