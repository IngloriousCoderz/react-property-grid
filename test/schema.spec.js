import {getType, match, defaults} from '../src/utilities/schema'
import {INTERNAL_ANY_OF, cleanup} from '../src/utilities/data'
import schema from './input/sample-schema.json'
import anotherSchema from './input/another-sample-schema.json'

describe('schema', () => {
  describe('getType', () => {
    it('should return the type given by the schema', () => {
      expect(getType(schema.properties.obj)).toEqual('object')
      expect(getType(schema.properties.obj.additionalProperties)).toEqual('string')
      expect(getType(schema.properties.arr)).toEqual('array')
      expect(getType(schema.properties.arr.items.anyOf[0].properties.item1)).toEqual('string')
      expect(getType(schema.additionalProperties.properties.primitive)).toEqual('number')
    })

    it('should expect no type to be an object', () => {
      expect(getType(schema)).toEqual('object')
      expect(getType(schema.properties.arr.items)).toEqual('object')
      expect(getType(schema.properties.arr.items.anyOf[1])).toEqual('number')
    })

    it('should return a custom \'enum\' type to deal with choices', () => {
      expect(getType(anotherSchema.properties.enum)).toEqual('enum')
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
      expect(defaults({type: 'integer', default: 42})).toBe(42)
    })

    it('should return the minimum value if no default is provided', () => {
      expect(defaults({type: 'integer', minimum: 42})).toBe(42)
    })

    it('should take into account the exclusiveMinimum clause when giving minimum as default', () => {
      expect(defaults({type: 'integer', minimum: 42, exclusiveMinimum: true})).toBe(43)
    })

    it('should return a dummy value in an \'anyOf\'', () => {
      expect(cleanup(defaults(schema.properties.arr.items))).toEqual(INTERNAL_ANY_OF)
    })

    it('should choose the second choice if specified', () => {
      expect(defaults(schema.properties.arr.items, 1)).toBe(0)
    })

    it('should recursively generate a default value for an object', () => {
      expect(cleanup(defaults(schema))).toEqual({obj: {}, arr: []})
    })
  })
})
