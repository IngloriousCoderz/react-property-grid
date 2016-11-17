import {
  inferType,
  getDefaultForType,
  splitProperties,
  importData,
  cleanup,
  setKey,
  setValue,
  addItem,
  removeItem
} from '../src/utilities/data'
import data from './input/sample-data.json'
import schema from './input/sample-schema.json'

describe('data', () => {
  describe('inferType', () => {
    it('should infer the right type for any data', () => {
      expect(inferType(false)).toEqual('boolean')
      expect(inferType(42.0)).toEqual('number')
      expect(inferType('hello')).toEqual('string')
      expect(inferType(() => {})).toEqual('function')
      expect(inferType({})).toEqual('object')
      expect(inferType([])).toEqual('array')
      expect(inferType(new Date())).toEqual('date')
      expect(inferType(/.*/)).toEqual('regexp')
      expect(inferType(undefined)).toEqual('undefined')
      expect(inferType(null)).toEqual('null')
    })
  })

  describe('getDefaultForType', () => {
    it('should give a default value for each type', () => {
      expect(getDefaultForType('boolean')).toEqual(false)
      expect(getDefaultForType('integer')).toEqual(0)
      expect(getDefaultForType('number')).toEqual(0)
      expect(getDefaultForType('string')).toEqual('')
      expect(inferType(getDefaultForType('function'))).toEqual('function')
      expect(getDefaultForType('object')).toEqual({})
      expect(getDefaultForType('array')).toEqual([])
      expect(inferType(getDefaultForType('date'))).toEqual('date')
      expect(getDefaultForType('regexp')).toEqual(/.*/)
      expect(getDefaultForType('undefined')).toEqual(undefined)
      expect(getDefaultForType('null')).toEqual(null)
    })
  })

  describe('splitProperties', () => {
    it('should put each property in its own container', () => {
      expect(splitProperties(data, schema)).toEqual({
        properties: {
          obj: {
            key1: 'value1'
          },
          arr: [
            {
              item1: 'value1'
            },
            42
          ]
        },
        additionalProperties: {
          optional: {
            primitive: 42
          }
        }
      })
    })
  })

  describe('importData', () => {
    it('should put an internal id inside each object', () => {
      const newData = importData(data)

      expect(newData.__id).toBeDefined()
      expect(newData.obj.__id).toBeDefined()
      expect(newData.obj.key1.__id).not.toBeDefined()
      expect(newData.arr.__id).not.toBeDefined()
      expect(newData.arr[0].__id).toBeDefined()
      expect(newData.arr[0].item1.__id).not.toBeDefined()
      expect(newData.arr[1].__id).not.toBeDefined()
    })
  })

  describe('cleanup', () => {
    it('should remove all internal ids from data', () => {
      expect(cleanup({
        __id: '1',
        obj: {
          __id: '2',
          key1: 'value1'
        },
        arr: [
          {
            __id: '3',
            item1: 'value1'
          },
          42
        ],
        optional: {
          primitive: 42
        }
      })).toEqual(data)
    })
  })

  describe('setKey', () => {
    it('should change a property key', () => {
      expect(setKey(data, '$.obj.key1', 'newKey1')).toEqual({
        obj: {
          newKey1: 'value1'
        },
        arr: [
          {
            item1: 'value1'
          },
          42
        ],
        optional: {
          primitive: 42
        }
      })
    })

    it('should change any key, even deeply nested ones', () => {
      expect(setKey(data, '$.arr.0.item1', 'newItem1')).toEqual({
        obj: {
          key1: 'value1'
        },
        arr: [
          {
            newItem1: 'value1'
          },
          42
        ],
        optional: {
          primitive: 42
        }
      })
    })
  })

  describe('setValue', () => {
    it('should change a property value', () => {
      expect(setValue(data, '$.obj.key1', 'newValue1')).toEqual({
        obj: {
          key1: 'newValue1'
        },
        arr: [
          {
            item1: 'value1'
          },
          42
        ],
        optional: {
          primitive: 42
        }
      })
    })

    it('should change any value, even deeply nested ones', () => {
      expect(setValue(data, '$.arr.0.item1', 'newValue1')).toEqual({
        obj: {
          key1: 'value1'
        },
        arr: [
          {
            item1: 'newValue1'
          },
          42
        ],
        optional: {
          primitive: 42
        }
      })
    })
  })

  describe('addItem', () => {
    it('should add a default value', () => {
      expect(cleanup(addItem(data, '$', schema))).toEqual({
        obj: {
          key1: 'value1'
        },
        arr: [
          {
            item1: 'value1'
          },
          42
        ],
        optional: {
          primitive: 42
        },
        optional2: {
          primitive: 0
        }
      })
    })

    it('should add an item of default type to an anyOf', () => {
      expect(cleanup(addItem(data, '$.arr', schema.properties.arr))).toEqual({
        obj: {
          key1: 'value1'
        },
        arr: [
          {
            item1: 'value1'
          },
          42, {
            'item1': ''
          }
        ],
        optional: {
          primitive: 42
        }
      })
    })

    it('should add an item of the given type in an anyOf', () => {
      expect(cleanup(addItem(data, '$.arr', schema.properties.arr, 1))).toEqual({
        obj: {
          key1: 'value1'
        },
        arr: [
          {
            item1: 'value1'
          },
          42,
          0
        ],
        optional: {
          primitive: 42
        }
      })
    })
  })

  describe('removeItem', () => {
    it('should remove a property from root', () => {
      expect(removeItem(data, '$.optional')).toEqual({
        obj: {
          key1: 'value1'
        },
        arr: [
          {
            item1: 'value1'
          },
          42
        ]
      })
    })

    it('should remove an item from an object', () => {
      expect(removeItem(data, '$.obj.key1')).toEqual({
        obj: {},
        arr: [
          {
            item1: 'value1'
          },
          42
        ],
        optional: {
          primitive: 42
        }
      })
    })

    it('should remove an item from an array', () => {
      expect(removeItem(data, '$.arr.0')).toEqual({
        obj: {
          key1: 'value1'
        },
        arr: [42],
        optional: {
          primitive: 42
        }
      })
    })
  })
})
