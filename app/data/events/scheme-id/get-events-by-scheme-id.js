const { SCHEME_ID } = require('../../../constants/categories')
const { getSubmittedEvents } = require('./get-submitted-events')
const { groupEventsByScheme } = require('./group-events-by-scheme')
const { getTotalSchemeValues } = require('./get-total-scheme-values')
const { orderGroupedEventsByScheme } = require('./order-grouped-events-by-scheme')
const { sanitiseSchemeData } = require('./sanitise-scheme-data')

const getEventsBySchemeId = async () => {
  const events = await getSubmittedEvents(SCHEME_ID)
  const groupedEvents = groupEventsByScheme(events)
  const totalSchemeValues = getTotalSchemeValues(groupedEvents)
  const orderedSchemeData = orderGroupedEventsByScheme(totalSchemeValues)
  return sanitiseSchemeData(orderedSchemeData)
}

module.exports = {
  getEventsBySchemeId
}
