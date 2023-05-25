const { SCHEME_ID } = require('../../../constants/categories')
const { getSubmittedEvents } = require('./get-submitted-events')
const { groupEventsByScheme } = require('./group-events-by-scheme')
const { getTotalSchemeValues } = require('./get-total-scheme-values')
const { orderGroupedEventsByScheme } = require('./order-grouped-events-by-scheme')
const { sanitiseSchemeData } = require('./sanitise-scheme-data')

const getEventsBySchemeId = async (schemeId) => {
  const events = await getSubmittedEvents(schemeId, SCHEME_ID) // filter to submitted events only
  const groupedEvents = groupEventsByScheme(events)
  const totalSchemeValues = getTotalSchemeValues(groupedEvents)
  const orderedSchemeData = orderGroupedEventsByScheme(totalSchemeValues) // change to sort by schemeId
  return sanitiseSchemeData(orderedSchemeData)
}

module.exports = {
  getEventsBySchemeId
}
