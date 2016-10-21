import React from 'react'
import '../utilities/object.js'
import {jsonPathToValue} from '../utilities/json'
import TextEditor from './text-editor'

class ObjectEditor extends React.Component {

  /*----------------------------------------------------------------------------*/
  render() {
    const {schema, data, objectKey} = this.props.options
    const key = objectKey != null
      ? objectKey
      : schema.title

    const derefSchema = this.dereference(schema)

    return (
      <div>
        <div style={{
          fontWeight: 'bold'
        }}>
          {key}
        </div>
        <ul>
          {this.renderProperties(derefSchema.properties, data)}
          {this.renderAdditionalProperties(derefSchema.additionalProperties, data)}
          {this.renderAnyOf(derefSchema.anyOf, data)}
        </ul>
      </div>
    )
  }

  /*----------------------------------------------------------------------------*/
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
    const key = propertyKey != null
      ? propertyKey
      : propertySchema.title

    const title = propertyKey
    const isArray = propertySchema.type === 'array'
    const isObject = propertySchema.type === 'object' || propertySchema.type == null
    const isValue = propertySchema.type != null && !isArray && !isObject
    const isEnum = propertySchema.enum != null

    let rendered = null
    if (isEnum) {
      rendered = this.renderPrimitive(propertySchema, propertyData)
    } else if (isValue) {
      rendered = this.renderPrimitive(propertySchema, propertyData)
    } else if (isObject) {
      rendered = (<ObjectEditor options={{
        schema: propertySchema,
        data: propertyData,
        fullSchema: this.props.options.fullSchema,
        objectKey: propertyKey
      }}/>)
    } else if (isArray) {
      rendered = this.renderArray(propertySchema, propertyData)
    }
    return (
      <li key={key + 'Property' + Math.random()}>
        {rendered}
      </li>
    )
  }

  renderArray(propertySchema, propertyData) {
    const key = propertySchema.title
    const rendered = propertyData.map((item, index) => {
      return this.renderProperty(propertySchema.items, item, key + `[${index}]`)
    })
    return (
      <div>
        <div style={{
          fontWeight: 'bold'
        }}>
          {key}
        </div>
        <ul key={key + 'Property' + Math.random()}>
          {rendered}
        </ul>
      </div>
    )
  }

  renderPrimitive(propertySchema, propertyData) {
    const title = propertySchema.title
    const key = propertySchema.title
    return (
      <div>
        <span style={{
          fontWeight: 'bold'
        }}>
          {title}
        </span>
        <span>
          <TextEditor options={{
            schema: propertySchema,
            data: propertyData
          }} key={key + 'Property' + Math.random()}/>
        </span>
      </div>
    )
  }

  // Select matching schema, based on (by convention) type attribute
  matchSchema(schemas, data) {
    let selectedSchema = schemas.filter(p => {
      p = this.dereference(p)
      return p.properties.type.enum.includes(data.type)
    })[0]
    return this.dereference(selectedSchema)
  }

  dereference(property) {
    const {fullSchema} = this.props.options
    const ref = property['$ref']
    if (ref != null) {
      const refPath = ref.replace('#/', '').replace('/', '.')
      const referencedSchema = jsonPathToValue(fullSchema, refPath)
      return referencedSchema
    } else {
      return property
    }
  }
}

/*----------------------------------------------------------------------------*/
ObjectEditor.propTypes = {}
ObjectEditor.defaultProps = {}

export default ObjectEditor
