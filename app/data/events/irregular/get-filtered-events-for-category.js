const { getFilteredEvents } = require('./get-filtered-events')
const { orderGroupedEvents } = require('../order-grouped-events')
const { sanitiseEvents } = require('../sanitise-events')
const { groupEventsByCorrelationId } = require('../group-events-by-correlation-id')

const getFilteredEventsForCategory = async (category, value) => {
  const events = await getFilteredEvents(category, value)
  const groupedEvents = groupEventsByCorrelationId(events)
  const orderedEvents = orderGroupedEvents(groupedEvents)
  return sanitiseEvents(orderedEvents)
}

module.exports = {
  getFilteredEventsForCategory
}
