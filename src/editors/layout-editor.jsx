import React from 'react'
import '../utilities/object.js'
import {jsonPathToValue} from '../utilities/json'
import TextEditor from './text-editor'

const styles = {
  fullWidth: {
    width: '100%'
  },
  condensed: {
    borderCollapse: 'collapse'
  },
  bordered: {
    border: '1px solid lightgrey'
  },
  caption: {
    fontWeight: 'bold'
  },
  description: {
    color: 'grey'
  }
}

class LayoutEditor extends React.Component {
  render() {
    const {schema, data} = this.props
    const clonedData = JSON.parse(JSON.stringify(data))

    return (
      <table style={{...styles.fullWidth, ...styles.condensed}}>
        <thead>
          <tr>
            <th colSpan='2' style={styles.bordered}>Properties</th>
          </tr>
        </thead>
        <tbody>
          {this.renderProperties(schema.properties, clonedData)}
        </tbody>
      </table>
    )
  }

  renderProperties(properties = {}, data) {
    return Object.keys(properties).map(key => this.renderProperty(properties[key], data[key], key))
  }

  renderProperty(schema, data, key) {
    if (schema['!editor-visible'] === false) {
      return null
    }

    const derefSchema = this.dereference(schema)
    const type = this.getType(derefSchema)
    data = data || this.getDefaultForType(type)

    switch (type) {
      case 'object':
        return this.renderObject(derefSchema, data, key)
      case 'array':
        return this.renderArray(derefSchema, data, key)
      default:
        return this.renderPrimitive(derefSchema, data, key)
    }
  }

  renderObject(schema, data, key) {
    const captionRow = this.renderCaptionRow(schema.title || key, schema.description)
    const properties = this.renderProperties(schema.properties, data)
    const additionalProperties = this.renderAdditionalProperties(schema.additionalProperties, data)
    const anyOf = this.renderAnyOf(schema.anyOf, data) || {}

    return [
      captionRow,
      ...properties,
      ...additionalProperties,
      ...anyOf
    ]
  }

  renderArray(schema, data, key) {
    const captionRow = this.renderCaptionRow(schema.title || key, schema.description)
    const items = data.map((item, index) => {
      return this.renderProperty(schema.items, item, `${schema.title || key}[${index}]`)
    })

    return [
      captionRow,
      ...items
    ]
  }

  renderCaptionRow(text, summary) {
    if (text == null) return null
    return (
      <tr>
        <td style={{...styles.bordered,...styles.caption}}>
          {text}
        </td>
        <td style={{...styles.bordered, ...styles.description}}>
          {summary}
        </td>
      </tr>
    )
  }

  renderAdditionalProperties(schema, data) {
    if (schema == null || schema === false || data == null) {
      return []
    }

    return Object.keys(data).map(key => {
      if (schema.$ref == null) {
        schema = this.matchSchema(schema.anyOf || [schema], data[key])
      }
      return this.renderProperty(schema, data[key], key)
    })
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

  renderPrimitive(propertySchema, propertyData, propertyKey) {
    const title = propertySchema.title || propertyKey
    const key = propertySchema.title
    return (
      <tr>
        <td style={styles.bordered}>
          {title}
        </td>
        <td style={styles.bordered}>
          <TextEditor schema={propertySchema} data={propertyData} key={key + 'Property' + Math.random()} />
        </td>
      </tr>
    )
  }

  /*----------------------------------------------------------------------------*/
  // Select matching schema, based on (by convention) type attribute
  matchSchema(schemas, data) {
    const type = this.inferType(data)
    const selectedSchemas = schemas.filter(schema => {
      schema = this.dereference(schema)
      if (data.type == null) {
        return schema.type === type
      }
      return schema.properties.type.enum.includes(data.type)
    })
    return selectedSchemas[0]
  }

  dereference(property) {
    const {schema} = this.props
    const ref = property['$ref']
    if (ref != null) {
      const refPath = ref.replace('#/', '').replace('/', '.')
      const referencedSchema = jsonPathToValue(schema, refPath)
      return referencedSchema
    } else {
      return property
    }
  }

  getType(schema) {
    if (schema.type == null) {
      return schema.enum != null ? 'string' : 'object'
    }
    if (schema.type === 'object') {
      return 'object'
    }
    if (schema.type === 'array') {
      return 'array'
    }

    return schema.type
  }

  /* http://arcturo.github.io/library/coffeescript/07_the_bad_parts.html */
  inferType(data) {
    const classToType = {}
    "Boolean Number String Function Array Date RegExp Undefined Null".split(" ").forEach(name => {
      classToType["[object " + name + "]"] = name.toLowerCase()
    })
    const strType = Object.prototype.toString.call(data)
    return classToType[strType] || "object"
  }

  getDefaultForType(type) {
    return {
      string: '',
      number: 0,
      "null": null,
      object: {},
      integer: 0,
      boolean: false,
      array: []
    }[type]
  }
}

/*----------------------------------------------------------------------------*/
LayoutEditor.propTypes = {}
LayoutEditor.defaultProps = {}

export default LayoutEditor
