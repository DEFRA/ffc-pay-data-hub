const moment = require('moment')
const { convertToPence } = require('../../currency-convert')
const { PAYMENT_EXTRACTED } = require('../../constants/events')
const schemeNames = require('../../constants/scheme-names')
const { getStatus } = require('./get-status')
const { getEventName } = require('./get-event-name')
const { DATE } = require('../../constants/date-format')

const sanitiseEvents = (events) => {
  return events.map(group => ({
    ...group,
    scheme: schemeNames[group.schemeId],
    status: getStatus(group.events),
    lastUpdated: moment(group.events[group.events.length - 1].time).format(DATE),
    events: group.events.map(event => ({
      ...event,
      data: {
        ...event.data,
        value: event.type === PAYMENT_EXTRACTED ? convertToPence(event.data.value) : event.data.value
      },
      status: getEventName(event.type)
    }))
  }))
}

module.exports = {
  sanitiseEvents
}
