import jsonpath from 'jsonpath'

const SEPARATOR = '.'

export const split = path => path.split(SEPARATOR)
export const join = path => path.join(SEPARATOR)//jsonpath.stringify(path)
export const subpath = (path, key) => path != null ? `${path}${SEPARATOR}${key}` : key
export const last = path => split(path).reverse()[0]
export const level = path => split(path).length - 1
