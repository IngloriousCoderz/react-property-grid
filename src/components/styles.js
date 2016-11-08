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
  height: '21px',
  borderRight: '1px solid lightgrey',
  borderBottom: '1px solid lightgrey',
  padding: '2px',
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
  margin: 0,
  border: 0,
  padding: 0,
  ...ellipsis
}
