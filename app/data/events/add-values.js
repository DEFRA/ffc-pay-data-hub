const { convertToString } = require('../../currency')

const addValues = (events) => {
  return events.map(event => ({
    ...event,
    originalValue: event.events[0]?.data.value,
    originalValueText: convertToString(event.events[0]?.data.value),
    currentValue: event.events[event.events.length - 1]?.data.value,
    currentValueText: convertToString(event.events[event.events.length - 1]?.data.value)
  }))
}

module.exports = {
  addValues
}
