const moment = require('moment')
const { convertToPence } = require('../../currency-convert')
const { PAYMENT_EXTRACTED } = require('../../constants/events')
const { DATE } = require('../../constants/date-format')
const schemeNames = require('../../constants/scheme-names')
const eventDetails = require('../../constants/event-details')
// this makes the data easier for payweb to consume
const sanitiseEvents = (events) => {
  return events.map(group => ({
    ...group,
    scheme: schemeNames[group.schemeId],
    status: eventDetails[group.events[group.events.length - 1].type],
    lastUpdated: moment(group.events[group.events.length - 1].time).format(DATE),
    events: group.events.map(event => ({
      ...event,
      data: {
        ...event.data,
        value: event.type === PAYMENT_EXTRACTED ? convertToPence(event.data.value) : event.data.value
      },
      status: eventDetails[event.type],
      timestamp: moment(event.time).format(DATE)
    }))
  }))
}

module.exports = {
  sanitiseEvents
}
