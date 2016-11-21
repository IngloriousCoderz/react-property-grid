export const row = {
  // display: 'table-row'
}

export const ellipsis = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}

export const cell = {
  ...ellipsis,
  // display: 'table-cell',
  display: 'inline-block',
  verticalAlign: 'top',
  textAlign: 'left',
  width: '50%',
  height: 21,
  borderRight: '1px solid lightgrey',
  borderBottom: '1px solid lightgrey',
  padding: 0
}

export const label = {
  ...ellipsis,
  padding: 3
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
  ...ellipsis,
  fontSize: 12,
  width: '100%',
  height: 20,
  margin: 0,
  border: 0,
  padding: 2
}
