import defaults from './json-schema-defaults'

export const layout2TreeDS = layout => {
  if (Array.isArray(layout)) {
    return layout.reduce((tree, item, index) => {
      const subtree = layout2TreeDS(item)
      if (subtree) {
        tree.push({
          id: index,
          text: index,
          items: subtree
        })
      }
      return tree
    }, [])
  }

  if (typeof layout === 'object' && typeof layout !== 'date') {
    return Object.keys(layout).reduce((tree, key) => {
      const item = layout[key]
      const subtree = layout2TreeDS(item)
      if (subtree) {
        tree.push({
          id: key,
          text: key,
          items: subtree
        })
      }
      return tree
    }, [])
  }

  // primitive type
  return undefined
}

export const schema2TreeDS = (schema, layout) => {
  if (layout) {
    // layout = adjustAccordingToSchema(schema)
  } else {
    layout = defaults(schema)
  }

  return layout2TreeDS(layout)

  // return [
  //   {
  //     "id": "server",
  //     "text": "Server"
  //   }, {
  //     "id": "styles",
  //     "text": "Styles",
  //     "items": []
  //   }, {
  //     "id": "viewers",
  //     "text": "Viewers",
  //     "items": []
  //   }
  // ]
}
