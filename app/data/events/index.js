const { getEventsByFrn } = require('./frn/get-events-by-frn')
const { getEventsByCorrelationId } = require('./correlation-id/get-events-by-correlation-id')
const { getEventsBySchemeId } = require('./scheme-id/get-events-by-scheme-id')
const { getEventsByBatch } = require('./batch/get-events-by-batch')

module.exports = {
  getEventsByFrn,
  getEventsByCorrelationId,
  getEventsBySchemeId,
  getEventsByBatch
}
