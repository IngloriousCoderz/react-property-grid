import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';

import {layout2TreeDS, schema2TreeDS} from './schema-utils'
import minimalLayout from './minimal-layout.json'
import schema from './layout-schema.json'

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(
//     <App/>, div);
// });

it('should give an empty tree on primitive value', () => {
  expect(layout2TreeDS(25000)).toEqual(undefined)
})

it('should give an empty tree on empty data', () => {
  expect(layout2TreeDS({})).toEqual([])
})

it('should give an empty tree on primitive-only members', () => {
  expect(layout2TreeDS({pageSize: 25000})).toEqual([])
})

it('should give a tree with one leaf on object members', () => {
  expect(layout2TreeDS({server: {}})).toEqual([
    {
      id: 'server',
      text: 'server',
      items: []
    }
  ])
})

it('should give a tree with one leaf on empty array members', () => {
  expect(layout2TreeDS({styles: []})).toEqual([
    {
      id: 'styles',
      text: 'styles',
      items: []
    }
  ])
})

// it('should give a tree with no entries on primitive-typed arrays', () => {
//   expect(layout2TreeDS({style: ["small", "xshort"]})).toEqual([
//     {
//       id: 'style',
//       text: 'style',
//       items: []
//     }
//   ])
// })

it('should give a tree with one leaf on non-empty array members', () => {
  expect(layout2TreeDS({
    styles: [
      {
        id: 'row',
        width: '100%'
      }
    ]
  })).toEqual([
    {
      id: 'styles',
      text: 'styles',
      items: [
        {
          id: 0,
          text: 0,
          items: []
        }
      ]
    }
  ])
})

it('should give a tree from minimal layout', () => {
  expect(layout2TreeDS(minimalLayout)).toEqual([
    {
      "id": "server",
      "text": "server",
      "items": []
    }, {
      "id": "styles",
      "text": "styles",
      "items": [
        {
          "id": 0,
          "text": 0,
          "items": []
        }, {
          "id": 1,
          "text": 1,
          "items": []
        }
      ]
    }, {
      "id": "viewers",
      "text": "viewers",
      "items": [
        {
          "id": 0,
          "text": 0,
          "items": [
            {
              "id": "bindings",
              "text": "bindings",
              "items": [
                {
                  "id": 0,
                  "text": 0,
                  "items": [
                    {
                      "id": "columns",
                      "text": "columns",
                      "items": [
                        {
                          "id": 0,
                          "text": 0,
                          "items": []
                        }, {
                          "id": 1,
                          "text": 1,
                          "items": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }, {
              "id": "style",
              "text": "style",
              "items": []
            }
          ]
        }
      ]
    }, {
      "id": "placing",
      "text": "placing",
      "items": [
        {
          "id": "props",
          "text": "props",
          "items": [
            {
              "id": "style",
              "text": "style",
              "items": []
            }
          ]
        }
      ]
    }, {
      "id": "defaults",
      "text": "defaults",
      "items": []
    }
  ])
})

it('should give default values for given schema', () => {
  expect(schema2TreeDS(schema)).toEqual([
    {
      "id": "server",
      "text": "server",
      "items": []
    }, {
      "id": "styles",
      "text": "styles",
      "items": []
    }, {
      "id": "viewers",
      "text": "viewers",
      "items": []
    }
  ])
})
