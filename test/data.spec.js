import {
  importData,
  exportData,
  setKey,
  setValue,
  addItem,
  removeItem
} from '../src/utilities/data'

describe('data', () => {
  const data = {
    obj: {
      key: 'value'
    },
    arr: [
      {
        item1: 'value1'
      },
      'item2'
    ]
  }

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
      const dataToExport = {
        obj: {
          __id: '1',
          key: 'value'
        },
        arr: [
          {
            __id: '2',
            item1: 'value1'
          },
          'item2'
        ]
      }

      const newData = exportData(dataToExport)

      expect(newData).toEqual(data)
    })
  })

  describe('setKey', () => {
    it('should change a property key', () => {
      const newData = setKey(data, 'obj.key', 'newKey')

      expect(newData).toEqual({
        obj: {
          newKey: 'value'
        },
        arr: [
          {
            item1: 'value1'
          },
          'item2'
        ]
      })
    })

    it('should change any key, even deeply nested ones', () => {
      const newData = setKey(data, 'arr[0].item1', 'newItem1')

      expect(newData).toEqual({
        obj: {
          key: 'value'
        },
        arr: [
          {
            newItem1: 'value1'
          },
          'item2'
        ]
      })
    })
  })

  describe('setValue', () => {
    it('should change a property value', () => {
      const newData = setValue(data, 'obj.key', 'newValue')

      expect(newData).toEqual({
        obj: {
          key: 'newValue'
        },
        arr: [
          {
            item1: 'value1'
          },
          'item2'
        ]
      })
    })

    it('should change any value, even deeply nested ones', () => {
      const newData = setValue(data, 'arr[0].item1', 'newValue1')

      expect(newData).toEqual({
        obj: {
          key: 'value'
        },
        arr: [
          {
            item1: 'newValue1'
          },
          'item2'
        ]
      })
    })
  })

  describe('addItem', () => {
    // too complex for now, needs schema
  })

  describe('removeItem', () => {
    it('should remove an item from an object', () => {
      const newData = removeItem(data, 'obj')

      expect(newData).toEqual({
        arr: [
          {
            item1: 'newValue1'
          },
          'item2'
        ]
      })
    })
  })
})
