const SEPARATOR = '.'

export const subpath = (path, key) => path != null ? `${path}${SEPARATOR}${key}` : key
export const last = path => path.split(SEPARATOR).reverse()[0]
export const level = path => path.split(SEPARATOR).length - 1
export const asciiTree = path => {
  const deep = level(path)
  return deep ? `${'&ensp;'.repeat(deep)}&dlcorn;` : ''
}
