const { FRN, CORRELATION_ID, SCHEME_ID, BATCH, INVOICE_NUMBER, AGREEMENT_NUMBER, CLAIM_NUMBER } = require('../constants/categories')
const { getEventsByFrn, getEventsByCorrelationId, getEventsByScheme, getEventsByBatch, getFilteredEventsForCategory } = require('./events')

const getData = async (category, value) => {
  switch (category) {
    case FRN:
      return getEventsByFrn(value)
    case CORRELATION_ID:
      return getEventsByCorrelationId(value)
    case SCHEME_ID:
      return getEventsByScheme()
    case BATCH:
      return getEventsByBatch(value)
    case INVOICE_NUMBER:
    case AGREEMENT_NUMBER:
    case CLAIM_NUMBER:
      return getFilteredEventsForCategory(category, value)
    default:
      throw new Error(`Unknown category: ${category}`)
  }
}

module.exports = {
  getData
}
