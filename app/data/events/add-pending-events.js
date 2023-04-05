const eventMap = require('./event-map')

const addPendingEvents = (events) => {
  events.forEach(group => {
    const pendingEvents = Object.entries(eventMap).map((event) => ({ type: event[0], ...event[1] })).filter(event => event.default && !events.some(e => e.events.some(e => e.type === event.type)))
    group.events = group.events.concat(pendingEvents.map(event => ({
      status: getEvent(event.type)
    })))
  })
  return events
}

const getEvent = (type) => {
  return eventMap[type]
}

module.exports = {
  addPendingEvents
}
