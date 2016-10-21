import React from 'react'
import '../utilities/object.js'
import {jsonPathToValue} from '../utilities/json'
import TextEditor from './text-editor'

const captionStyle = {
  fontWeight: 'bold'
}

class LayoutEditor extends React.Component {

  /*----------------------------------------------------------------------------*/
  render() {

    const {schema, data} = this.props.options

    const clonedData = JSON.parse(JSON.stringify(data))
    const derefSchema = this.dereference(schema)

    const rendered = this.renderObject(derefSchema, clonedData)
    return (
      <table>
        <tbody>
          {rendered}
        </tbody>
      </table>
    )
  }

  /*----------------------------------------------------------------------------*/
  renderObject(schema, data, objectKey) {
    const key = objectKey != null
      ? objectKey
      : schema.title

    const derefSchema = this.dereference(schema)

    const captionRow = this.renderCaptionRow(key)
    const properties = this.renderProperties(derefSchema.properties, data) || {}
    const additionalProperties = this.renderAdditionalProperties(derefSchema.additionalProperties, data) || {}
    const anyOf = this.renderAnyOf(derefSchema.anyOf, data) || {}

    const rendered = [
      captionRow,
      ...properties,
      ...additionalProperties,
      ...anyOf
    ]
    return rendered

  }

  renderProperties(properties, data) {
    if (properties == null) {
      return
    }

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
    try {
      if (property == null || property === false || data == null)
        return null
      if (property.anyOf != null) {
        return Object.keys(data).map((propertyKey) => {

          // Primitive types haven't "type" property in data,
          // so only string type is allowed in "anyOf" schema prop
          if (data[propertyKey].type == null) {
            return this.renderProperty({
              type: 'string'
            }, data[propertyKey], propertyKey)
          }

          // Render matching schema
          let selectedSchema = this.matchSchema(property.anyOf, data[propertyKey])
          const rendered = this.renderProperty(selectedSchema, data[propertyKey], propertyKey)
          return rendered
        })
      } else {
        return Object.keys(data).map((propertyKey) => {
          const rendered = this.renderProperty(property, data[propertyKey], propertyKey)
          return rendered
        })
      }
    } catch (e) {
      debugger
    }
  }

  renderAnyOf(anyOfSchema, data)
  {
    if (anyOfSchema == null || data == null) {
      return null
    }
    const selectedSchema = this.matchSchema(anyOfSchema, data)
    const rendered = this.renderProperty(selectedSchema, data)
    return rendered
  }

  renderProperty(propertySchema, propertyData, propertyKey) {
    const key = propertyKey || propertySchema.title
    const title = key
    const isArray = propertySchema.type === 'array'
    const isObject = propertySchema.type === 'object' || propertySchema.type == null
    const isValue = propertySchema.type != null && !isArray && !isObject
    const isEnum = propertySchema.enum != null

    let rendered = null
    if (isEnum) {
      rendered = this.renderPrimitive(propertySchema, propertyData, propertyKey)
    } else if (isValue) {
      rendered = this.renderPrimitive(propertySchema, propertyData, propertyKey)
    } else if (isObject) {
      rendered = this.renderObject(propertySchema, propertyData, propertyKey)
    } else if (isArray) {
      rendered = this.renderArray(propertySchema, propertyData)
    }
    return rendered
  }

  renderArray(propertySchema, propertyData) {
    const key = propertySchema.title
    const rendered = propertyData.map((item, index) => {
      return this.renderProperty(propertySchema.items, item, key + `[${index}]`)
    })
    return [
      this.renderCaptionRow(key), ...rendered
    ]
  }

  renderPrimitive(propertySchema, propertyData, propertyKey) {
    const title = propertySchema.title || propertyKey
    const key = propertySchema.title
    return (
      <tr>
        <td style={captionStyle}>
          {title}
        </td>
        <td>
          <TextEditor options={{
            schema: propertySchema,
            data: propertyData
          }} key={key + 'Property' + Math.random()}/>
        </td>
      </tr>
    )
  }

  renderCaptionRow(text) {
    return (
      <tr>
        <td style={captionStyle}>
          {text}
        </td>
        <td></td>
      </tr>
    )
  }

  /*----------------------------------------------------------------------------*/
  // Select matching schema, based on (by convention) type attribute
  matchSchema(schemas, data) {
    let selectedSchema = schemas.filter(p => {
      p = this.dereference(p)
      return p.properties.type.enum.includes(data.type)
    })[0]
    return this.dereference(selectedSchema)
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
