const { SCHEME_ID } = require('../../../constants/categories')
const { getSubmittedEvents } = require('./get-submitted-events')
const { groupEventsByScheme } = require('./group-events-by-scheme')
const { getTotalSchemeValues } = require('./get-total-scheme-values')
const { orderGroupedEvents } = require('./order-grouped-events')
const { sanitiseEvents } = require('../sanitise-events')

const getEventsBySchemeId = async (schemeId) => {
  const events = await getSubmittedEvents(schemeId, SCHEME_ID) // filter to submitted events only
  const groupedEvents = groupEventsByScheme(events)
  const totalSchemeValues = getTotalSchemeValues(groupedEvents)
  const orderedEvents = orderGroupedEvents(totalSchemeValues) // change to sort by schemeId
  return sanitiseEvents(orderedEvents)
}

module.exports = {
  getEventsBySchemeId
}
