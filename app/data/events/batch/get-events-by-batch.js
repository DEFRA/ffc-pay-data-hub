const { BATCH } = require('../../../constants/categories')
const { getEvents } = require('../get-events')
const { groupEventsByFrn } = require('./group-events-by-frn')
const { orderGroupedEvents } = require('../order-grouped-events')
const { sanitiseEvents } = require('../sanitise-events')

const getEventsByBatch = async (batch) => {
  const events = await getEvents(batch, BATCH)
  const groupedEvents = groupEventsByFrn(events)
  const orderedEvents = orderGroupedEvents(groupedEvents)
  return sanitiseEvents(orderedEvents)
}

module.exports = {
  getEventsByBatch
}
