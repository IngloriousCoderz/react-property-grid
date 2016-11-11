import {
  split,
  join,
  parent,
  child,
  last,
  level
} from '../src/utilities/path'

describe('path', () => {
  describe('split', () => {
    it('should split a path into tokens', () => {
      expect(split('$.obj.key')).toEqual(['$', 'obj', 'key'])
      expect(split('$.arr.0')).toEqual(['$', 'arr', '0'])
      expect(split('$.arr.0.item1')).toEqual(['$', 'arr', '0', 'item1'])
    })
  })

  describe('join', () => {
    it('should join tokens together to form a path', () => {
      expect(join(['$', 'obj', 'key'])).toEqual('$.obj.key')
      expect(join(['$', 'arr', '0'])).toEqual('$.arr.0')
      expect(join(['$', 'arr', '0', 'item1'])).toEqual('$.arr.0.item1')
    })

    it('should not break if token is a number', () => {
      expect(join(['$', 'arr', 0, 'item1'])).toEqual('$.arr.0.item1')
    })
  })

  describe('parent', () => {
    it('should return the parent element\'s path', () => {
      expect(parent('$.obj.key')).toEqual('$.obj')
      expect(parent('$.arr.0')).toEqual('$.arr')
      expect(parent('$.arr.0.item1')).toEqual('$.arr.0')
    })
  })

  describe('child', () => {
    it('should return the child element\'s path given its key', () => {
      expect(child('$.obj', 'key')).toEqual('$.obj.key')
      expect(child('$.arr', '0')).toEqual('$.arr.0')
      expect(child('$.arr.0', 'item1')).toEqual('$.arr.0.item1')
    })

    it('should not break if token is a number', () => {
      expect(child('$.arr', 0)).toEqual('$.arr.0')
    })
  })

  describe('last', () => {
    it('should return the last token of a path', () => {
      expect(last('$.obj.key')).toEqual('key')
      expect(last('$.arr.0')).toEqual('0')
      expect(last('$.arr.0.item1')).toEqual('item1')
    })
  })

  describe('level', () => {
    it('should return the path\'s deepness', () => {
      expect(level('$.obj.key')).toEqual(2)
      expect(level('$.arr.0')).toEqual(2)
      expect(level('$.arr.0.item1')).toEqual(3)
    })
  })
})
