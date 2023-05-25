const { toCurrencyString } = require('../../to-currency-string')

const addValues = (events) => {
  return events.map(event => ({
    ...event,
    originalValue: event.events[0]?.data.value,
    originalValueText: toCurrencyString(event.events[0]?.data.value),
    currentValue: event.events[event.events.length - 1]?.data.value,
    currentValueText: toCurrencyString(event.events[event.events.length - 1]?.data.value)
  }))
}

module.exports = {
  addValues
}
