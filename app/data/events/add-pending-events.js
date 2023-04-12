const eventDetails = require('../../constants/event-details')

const addPendingEvents = (events) => {
  events.forEach(group => {
    const pendingEvents = Object.entries(eventDetails)
      .map((event) => ({ type: event[0], ...event[1] }))
      .filter(event => event.default && !events.some(e => e.events.some(e => e.type === event.type)))
    group.events = group.events.concat(pendingEvents.map(event => ({
      status: eventDetails[event.type]
    })))
  })
  return events
}

module.exports = {
  addPendingEvents
}
