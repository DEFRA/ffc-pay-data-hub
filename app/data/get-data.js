const { FRN, CORRELATION_ID, SCHEME_ID } = require('../constants/categories')
const { getEventsByFrn } = require('./events')
const { getEventsByCorrelationId } = require('./events')
const { getEventsBySchemeId } = require('./events')

const getData = async (category, value) => {
  switch (category) {
    case FRN:
      return getEventsByFrn(value)
    case CORRELATION_ID:
      return getEventsByCorrelationId(value)
    case SCHEME_ID:
      return getEventsBySchemeId(value)
    default:
      throw new Error(`Unknown category: ${category}`)
  }
}

module.exports = {
  getData
}
