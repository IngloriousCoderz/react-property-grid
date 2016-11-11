export const ALL = '$..*'

export const split = path => path.split('.')
export const join = tokens => tokens.join('.')
export const parent = path => join(split(path).slice(0, -1))
export const child = (path, key) => join([path, key])
export const last = path => split(path).reverse()[0]
export const level = path => split(path).length - 1
