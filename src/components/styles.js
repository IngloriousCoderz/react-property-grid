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
  textAlign: 'left',
  width: '50%',
  height: 21,
  borderRight: '1px solid lightgrey',
  borderBottom: '1px solid lightgrey',
  // padding: 2,
  padding: 0,
  ...ellipsis
}

export const buttonGroup = {
  float: 'right',
  padding: 3
}

export const button = {
  display: 'inline-block',
  width: 14,
  borderLeft: '1px solid lightgrey',
  textAlign: 'center'
}

export const input = {
  fontSize: 12,
  width: '100%',
  height: 20,
  margin: 0,
  border: 0,
  padding: 2,
  ...ellipsis
}

export const label = {
  verticalAlign: 'middle'
}
