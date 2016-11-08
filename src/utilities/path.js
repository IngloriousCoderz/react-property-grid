const SEPARATOR = '.'

export const split = path => path.split(SEPARATOR)
export const join = path => path.join(SEPARATOR)
export const subpath = (path, key) => path != null ? `${path}${SEPARATOR}${key}` : key
export const last = path => split(path).reverse()[0]
export const level = path => split(path).length - 1
export const asciiTree = (path, expanded) => {
  const deep = level(path)
  const spacing = deep ? `${'&ensp;'.repeat(2 * deep)}` : ''//&dlcorn;
  return expanded != null ? `${spacing}${expanded ? '&dtri;' : '&rtri;'}` : spacing
}
