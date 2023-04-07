const groupEventsByCorrelationId = (events) => {
  return [...events.reduce((x, y) => {
    const key = y.correlationId

    // if key doesn't exist then first instance so create new group
    const item = x.get(key) || Object.assign({}, {
      frn: y.data.frn,
      correlationId: y.partitionKey,
      schemeId: y.data.schemeId,
      paymentRequestNumber: y.data.paymentRequestNumber,
      agreementNumber: y.data.agreementNumber,
      marketingYear: y.data.marketingYear,
      events: []
    })
    item.events.push(y)

    return x.set(key, item)
  }, new Map()).values()]
}

module.exports = {
  groupEventsByCorrelationId
}
