const { SCHEME_ID } = require('../../../constants/categories')
const { groupEventsByScheme } = require('./group-events-by-scheme')
const { orderGroupedEvents } = require('./order-grouped-events')
const { sanitiseEvents } = require('../sanitise-events')
const { getSubmittedEvents } = require('./get-submitted-events')

const getEventsBySchemeId = async (schemeId) => {
  const events = await getSubmittedEvents(schemeId, SCHEME_ID) // filter to submitted events only
  const groupedEvents = groupEventsByScheme(events)
  // function to sum payments and calc total of payments.
  const orderedEvents = orderGroupedEvents(groupedEvents) // change to sort by schemeId
  return sanitiseEvents(orderedEvents)
}

module.exports = {
  getEventsBySchemeId
}
