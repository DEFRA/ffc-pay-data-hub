const moment = require('moment')
const { convertToPence } = require('../../currency-convert')
const { PAYMENT_EXTRACTED } = require('../../constants/events')
const schemeNames = require('../../constants/scheme-names')
const eventMap = require('./event-map')
const { DATE } = require('../../constants/date-format')

const sanitiseEvents = (events) => {
  return events.map(group => ({
    ...group,
    scheme: schemeNames[group.schemeId],
    status: eventMap[group.events[group.events.length - 1].type],
    lastUpdated: moment(group.events[group.events.length - 1].time).format(DATE),
    events: group.events.map(event => ({
      ...event,
      data: {
        ...event.data,
        value: event.type === PAYMENT_EXTRACTED ? convertToPence(event.data.value) : event.data.value
      },
      status: eventMap[event.type],
      timestamp: moment(event.time).format(DATE)
    }))
  }))
}

module.exports = {
  sanitiseEvents
}
