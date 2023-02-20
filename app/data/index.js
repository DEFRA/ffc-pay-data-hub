const { getEventsByFrn } = require('./events')
const { getEventsByCorrelationId } = require('./events')

module.exports = {
  getEventsByFrn,
  getEventsByCorrelationId
}
