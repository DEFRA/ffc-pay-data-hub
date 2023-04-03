const createMessage = (body, type, options) => {
  return {
    body,
    type,
    source: 'ffc-pay-data-hub',
    ...options
  }
}

module.exports = createMessage
