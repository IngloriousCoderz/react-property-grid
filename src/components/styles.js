export const row = {
  // display: 'table-row'
}

export const ellipsis = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}

export const cell = {
  // display: 'table-cell',
  display: 'inline-block',
  verticalAlign: 'top',
  width: '50%',
  height: 21,
  borderRight: '1px solid lightgrey',
  borderBottom: '1px solid lightgrey',
  padding: 2,
  ...ellipsis
}

export const buttonGroup = {
  float: 'right'
}

export const button = {
  display: 'inline-block',
  width: 14,
  borderLeft: '1px solid lightgrey',
  textAlign: 'center'
}

export const input = {
  width: '100%',
  height: 21,
  margin: 0,
  border: 0,
  padding: 2,
  ...ellipsis
}
