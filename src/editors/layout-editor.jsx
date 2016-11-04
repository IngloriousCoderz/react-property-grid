import React, {Component} from 'react'
import {jsonPathToValue} from '../utilities/json'
import TextEditor from './text-editor'

const styles = {
  editor: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '12px'
  },
  cell: {
    height: '20px',
    border: '1px solid lightgrey',
    padding: '2px'
  },
  inputCell: {
    padding: 0
  },
  label: {
    fontWeight: 'bold'
  },
  description: {
    color: 'grey'
  }
}

class LayoutEditor extends Component {
  render() {
    const {schema, data} = this.props
    const clonedData = JSON.parse(JSON.stringify(data))

    return (
      <table style={styles.editor}>
        <thead>
          <tr>
            <th colSpan='2' style={styles.cell}>Properties</th>
          </tr>
        </thead>
        <tbody>
          {this.renderProperties(schema.properties, clonedData)}
        </tbody>
      </table>
    )
  }

  renderProperties(properties = {}, data, level = 0) {
    return Object.keys(properties).map(key => this.renderProperty(properties[key], data[key], key, level))
  }

  renderProperty(schema, data, key, level) {
    if (schema['!editor-visible'] === false) {
      return null
    }

    const derefSchema = this.dereference(schema)
    const type = this.getType(derefSchema)
    data = data || this.getDefaultForType(type)

    switch (type) {
      case 'object':
        return this.renderObject(derefSchema, data, key, level)
      case 'array':
        return this.renderArray(derefSchema, data, key, level)
      default:
        return this.renderPrimitive(derefSchema, data, key, level)
    }
  }

  renderObject(schema, data, key, level) {
    const captionRow = this.renderCaptionRow(schema.title || key, schema.description, level)
    level++
    const properties = this.renderProperties(schema.properties, data, level)
    const additionalProperties = this.renderAdditionalProperties(schema.additionalProperties, data, level)
    const anyOf = this.renderAnyOf(schema.anyOf, data, level)

    return [
      captionRow,
      ...properties,
      ...additionalProperties,
      ...anyOf
    ]
  }

  renderArray(schema, data, key, level) {
    const captionRow = this.renderCaptionRow(schema.title || key, schema.description, level)
    level++
    const items = data.map((item, index) => {
      return this.renderProperty(schema.items, item, `${schema.title || key}[${index}]`, level)
    })

    return [
      captionRow,
      ...items
    ]
  }

  renderCaptionRow(text, summary, level) {
    if (text == null) return null
    return (
      <tr>
        <td style={{...styles.cell,...styles.label}}>
          {'-'.repeat(level)}{text}
        </td>
        <td style={{...styles.cell, ...styles.description}}>
          {summary}
        </td>
      </tr>
    )
  }

  renderAdditionalProperties(schema, data, level) {
    if (schema == null || schema === false || data == null) {
      return []
    }

    return Object.keys(data).map(key => {
      if (schema.$ref == null) {
        schema = this.matchSchema(schema.anyOf || [schema], data[key])
      }
      return this.renderProperty(schema, data[key], key, level)
    })
  }

  renderAnyOf(anyOfSchema, data, level) {
    if (anyOfSchema == null || data == null) {
      return []
    }

    const selectedSchema = this.matchSchema(anyOfSchema, data)
    return this.renderProperty(selectedSchema, data, null, level)
  }

  renderPrimitive(schema, data, key, level) {
    const caption = schema.title || key
    return (
      <tr>
        <td style={styles.cell}>
          {'-'.repeat(level)}{caption}
        </td>
        <td style={{...styles.cell, ...styles.inputCell}}>
          <TextEditor schema={schema} data={data} />
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
