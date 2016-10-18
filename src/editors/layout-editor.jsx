import React from 'react'
import '../utilities/object.js'
// import deref from 'json-schema-deref-sync'

/*----------------------------------------------------------------------------*/
class LayoutEditor extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  render() {
    const {schema, dataSource} = this.props.options
    // const derefSchema = deref(schema)
    const properties = renderProperties(schema.properties, dataSource)
    return (
      <div onClick={this.handleClick}>{properties}</div>
    )
  }
  handleClick() {
    alert("Click")
  }
}

/*----------------------------------------------------------------------------*/
function renderProperties(properties, data) {
  try {
    if (properties != null) {
      return Object.keys(properties).map((propertyKey) => {
        const rendered = renderProperty(properties[propertyKey], data[propertyKey])
        return rendered
      })
    } else {
      return null
    }
  } catch (e) {
    debugger
  }
}

function renderAdditionalProperties(property, data) {
  if (property != null && property !== false && data != null) {
    return Object.keys(data).map((propertyKey) => {
      const rendered = renderProperty(property, data[propertyKey], propertyKey)
      return rendered
    })
  } else {
    return null
  }
}

function renderProperty(property, value, propertyKey) {
  const key = propertyKey != null
    ? propertyKey
    : property.title
  const title = key
  const isArray = property.type === 'array'
  const isObject = property.type === 'object' || property.type == null
  const isValue = property.type != null && !isArray && !isObject
  let rendered = null

  if (isValue) {
    rendered = renderValueProperty(property, value)
  } else if (isObject) {
    const objectRendered = renderObjectProperty(property, value)
    rendered = (
      <div key={key + 'Property' + Math.random()}>
        {objectRendered.properties}
        {objectRendered.additionalProperties}
      </div>
    )
  } else if (isArray) {
    rendered = (
      <div key={key + 'Property' + Math.random()}>
        {renderArrayProperty(property, value)}
      </div>
    )
  }

  return (
    <div key={key + 'Property' + Math.random()}>
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

function renderObjectProperty(property, value) {
  let rendered = {}
  if (property.properties != null) {
    rendered.properties = renderProperties(property.properties, value)
  }
  if (property.additionalProperties != null) {
    rendered.additionalProperties = renderAdditionalProperties(property.additionalProperties, value)
  }
  return rendered
}

function renderArrayProperty(property, value) {
  const rendered = value.map((item) => {
    return renderProperty(property.items, item)
  })
  return rendered
}

function renderValueProperty(property, value) {
  const key = property.title
  const title = property.title
  return (
    <div key={key + 'Property' + Math.random()}>
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

/*----------------------------------------------------------------------------*/
LayoutEditor.propTypes = {}
LayoutEditor.defaultProps = {}

export default LayoutEditor
