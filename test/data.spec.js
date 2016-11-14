import {
  inferType,
  getDefaultForType,
  importData,
  exportData,
  setKey,
  setValue,
  addItem,
  removeItem
} from '../src/utilities/data'
import data from './sample-data.json'

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
      expect(getDefaultForType('regexp')).toEqual(/.*/),
      expect(getDefaultForType('undefined')).toEqual(undefined)
      expect(getDefaultForType('null')).toEqual(null)
    })
  })

  describe('importData', () => {
    it('should put an internal id inside each object (except root)', () => {
      const newData = importData(data)

      expect(newData.__id).not.toBeDefined()
      expect(newData.obj.__id).toBeDefined()
      expect(newData.obj.key.__id).not.toBeDefined()
      expect(newData.arr.__id).not.toBeDefined()
      expect(newData.arr[0].__id).toBeDefined()
      expect(newData.arr[0].item1.__id).not.toBeDefined()
      expect(newData.arr[1].__id).not.toBeDefined()
    })
  })

  describe('exportData', () => {
    it('should remove all internal ids from data', () => {
      expect(exportData({
        obj: {
          __id: '1',
          key: 'value'
        },
        arr: [
          {
            __id: '2',
            item1: 'value1'
          },
          42
        ]
      })).toEqual(data)
    })
  })

  describe('setKey', () => {
    it('should change a property key', () => {
      expect(setKey(data, '$.obj.key', 'newKey')).toEqual({
        obj: {
          newKey: 'value'
        },
        arr: [
          {
            item1: 'value1'
          },
          42
        ]
      })
    })

    it('should change any key, even deeply nested ones', () => {
      expect(setKey(data, '$.arr.0.item1', 'newItem1')).toEqual({
        obj: {
          key: 'value'
        },
        arr: [
          {
            newItem1: 'value1'
          },
          42
        ]
      })
    })
  })

  describe('setValue', () => {
    it('should change a property value', () => {
      expect(setValue(data, '$.obj.key', 'newValue')).toEqual({
        obj: {
          key: 'newValue'
        },
        arr: [
          {
            item1: 'value1'
          },
          42
        ]
      })
    })

    it('should change any value, even deeply nested ones', () => {
      expect(setValue(data, '$.arr.0.item1', 'newValue1')).toEqual({
        obj: {
          key: 'value'
        },
        arr: [
          {
            item1: 'newValue1'
          },
          42
        ]
      })
    })
  })

  describe('addItem', () => {
    // too complex for now, needs schema
  })

  describe('removeItem', () => {
    it('should remove an item from an object', () => {
      expect(removeItem(data, '$.obj')).toEqual({
        arr: [
          {
            item1: 'value1'
          },
          42
        ]
      })
    })
  })
})
