import {getType, match, defaults} from '../src/utilities/schema'
import {exportData} from '../src/utilities/data'
import schema from './sample-schema.json'

describe('schema', () => {
  describe('getType', () => {
    it('should return the type given by the schema', () => {
      expect(getType(schema.properties.obj)).toEqual('object')
      expect(getType(schema.properties.obj.additionalProperties)).toEqual('string')
      expect(getType(schema.properties.arr)).toEqual('array')
      expect(getType(schema.properties.arr.items.anyOf[0].properties.item1)).toEqual('string')
    })

    it('should expect no type to be an object', () => {
      expect(getType(schema)).toEqual('object')
      expect(getType(schema.properties.arr.items)).toEqual('object')
      expect(getType(schema.properties.arr.items.anyOf[1])).toEqual('number')
    })
  })

  describe('match', () => {
    it('should choose the right schema by matching an \'anyOf\' subschema', () => {
      const {anyOf} = schema.properties.arr.items

      expect(match(anyOf, {
        item1: 'value1'
      }, schema)).toBe(anyOf[0])

      expect(match(anyOf, 42, schema)).toBe(anyOf[1])
    })
  })

  describe('defaults', () => {
    it('should return the default value provided by the schema', () => {
      expect(defaults({"type": "integer", "default": 42})).toBe(42)
    })

    it('should return the minimum value if no default is provided', () => {
      expect(defaults({"type": "integer", "minimum": 42})).toBe(42)
    })

    it('should take into account the exclusiveMinimum clause when giving minimum as default', () => {
      expect(defaults({"type": "integer", "minimum": 42, "exclusiveMinimum": true})).toBe(43)
    })

    it('should choose the first choice in an \'anyOf\'', () => {
      expect(exportData(defaults(schema.properties.arr.items))).toEqual({item1: ''})
    })

    it('should recursively generate a default value for an object', () => {
      expect(exportData(defaults(schema))).toEqual({obj: {}, arr: []})
    })
  })
})
