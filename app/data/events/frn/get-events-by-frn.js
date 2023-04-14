const { FRN } = require('../../../constants/categories')
const { getEvents } = require('../get-events')
const { groupEventsByFrn } = require('./group-events-by-frn')
const { orderGroupedEvents } = require('./order-grouped-events')
const { sanitiseEvents } = require('../sanitise-events')

const getEventsByFrn = async (frn) => {
  const events = await getEvents(frn, FRN)
  const groupedEvents = groupEventsByFrn(events)
  const orderedEvents = orderGroupedEvents(groupedEvents)
  return sanitiseEvents(orderedEvents)
}

module.exports = {
  getEventsByFrn
}
