const { getEventsByFrn } = require('./frn/get-events-by-frn')
const { getEventsByCorrelationId } = require('./correlation-id/get-events-by-correlation-id')

module.exports = {
  getEventsByFrn,
  getEventsByCorrelationId
}
