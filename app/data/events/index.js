const { getEventsByFrn } = require('./frn')
const { getEventsByCorrelationId } = require('./correlation-id')

module.exports = {
  getEventsByFrn,
  getEventsByCorrelationId
}
