const { getEventsByFrn } = require('./events')
const { getEventsByCorrelationId } = require('./events')

const getData = async (category, value) => {
  switch (category) {
    case 'frn':
      return await getEventsByFrn(value)
    case 'correlationId':
      return await getEventsByCorrelationId(value)
    default:
      throw new Error(`Unknown category: ${category}`)
  }
}

module.exports = {
  getData
}
