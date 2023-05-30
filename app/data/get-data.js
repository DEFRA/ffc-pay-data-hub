const { FRN, CORRELATION_ID, SCHEME_ID, BATCH } = require('../constants/categories')
const { getEventsByFrn } = require('./events')
const { getEventsByCorrelationId } = require('./events')
const { getEventsBySchemeId } = require('./events')
const { getEventsByBatch } = require('./events')

const getData = async (category, value) => {
  switch (category) {
    case FRN:
      return getEventsByFrn(value)
    case CORRELATION_ID:
      return getEventsByCorrelationId(value)
    case SCHEME_ID:
      return getEventsBySchemeId(value)
    case BATCH:
      return getEventsByBatch(value)
    default:
      throw new Error(`Unknown category: ${category}`)
  }
}

module.exports = {
  getData
}
