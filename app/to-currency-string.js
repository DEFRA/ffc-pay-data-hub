const toCurrencyString = (value) => {
  if (!value) {
    return '£0.00'
  }
  const numParts = (value / 100).toFixed(2).split('.')
  numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  numParts[1] = numParts[1] ? numParts[1].padEnd(2, '0') : '00'
  return `£${numParts.join('.')}`
}

module.exports = {
  toCurrencyString
}
