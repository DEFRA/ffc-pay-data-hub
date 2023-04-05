const { FRN, CORRELATION_ID } = require('../constants/categories')
const { getEventsByFrn } = require('./events')
const { getEventsByCorrelationId } = require('./events')

const getData = async (category, value) => {
  switch (category) {
    case FRN:
      return await getEventsByFrn(value)
    case CORRELATION_ID:
      return await getEventsByCorrelationId(value)
    default:
      throw new Error(`Unknown category: ${category}`)
  }
}

module.exports = {
  getData
}
