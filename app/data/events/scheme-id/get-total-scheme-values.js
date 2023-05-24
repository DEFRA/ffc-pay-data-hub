const getTotalSchemeValues = (groupedEvents) => {
  // loop over grouped events and sum all values and return schemeId, total number of payments, total value
  return groupedEvents.map((eventsByScheme) => {
    const totalValue = eventsByScheme.events.reduce((total, current) => {
      total += current.data.value
      return total
    }, 0)
    return {
      schemeId: eventsByScheme.schemeId,
      totalPaymentRequests: eventsByScheme.events.length,
      totalValue
    }
  })
}

module.exports = {
  getTotalSchemeValues
}
