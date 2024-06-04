const eventDetails = require('../../constants/event-details')

const createPendingEvents = () => {
  return Object.entries(eventDetails)
    .map((event) => ({ type: event[0], ...event[1] }))
}

const filterPendingEvents = (events, pendingEvents) => {
  return pendingEvents.filter(event => event.default && !events.some(e => e.events.some(e => e.type === event.type)))
}

const addPendingEventsToGroup = (group, events) => {
  const pendingEvents = createPendingEvents()
  const filteredEvents = filterPendingEvents(events, pendingEvents)
  group.events = group.events.concat(filteredEvents.map(event => ({
    status: eventDetails[event.type]
  })))
}

const addPendingEvents = (events) => {
  events.forEach(group => addPendingEventsToGroup(group, events))
  return events
}

module.exports = {
  addPendingEvents
}
