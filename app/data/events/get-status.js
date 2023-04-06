const eventMap = require('./event-map')

const getStatus = (events) => {
  const lastEvent = events[events.length - 1]
  return eventMap[lastEvent.type]
}

module.exports = {
  getStatus
}
