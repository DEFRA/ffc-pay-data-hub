const { CORRELATION_ID } = require('../../constants/categories')
const { addPendingEvents } = require('./add-pending-events')
const { getEvents } = require('./get-events')
const { groupEventsByCorrelationId } = require('./group-events-by-correlation-id')
const { orderGroupedEvents } = require('./order-grouped-correlation-id-events')
const { sanitiseEvents } = require('./sanitise-events')

const getEventsByCorrelationId = async (correlationId) => {
  const events = await getEvents(correlationId, CORRELATION_ID)
  const groupedEvents = groupEventsByCorrelationId(events)
  const orderedEvents = orderGroupedEvents(groupedEvents)
  const sanitisedEvents = sanitiseEvents(orderedEvents)
  return addPendingEvents(sanitisedEvents)[0]
}

module.exports = {
  getEventsByCorrelationId
}
