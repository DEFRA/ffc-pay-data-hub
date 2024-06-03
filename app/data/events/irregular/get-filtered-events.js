const { getClient, odata } = require('../../../storage')
const { PAYMENT_EVENT } = require('../../../constants/event-types')
const { CORRELATION_ID } = require('../../../constants/categories')

const getFilteredEvents = async (category, value) => {
  const client = getClient(PAYMENT_EVENT)
  const eventResults = client.listEntities({ queryOptions: { filter: odata`category eq '${CORRELATION_ID}'` } })
  const events = []
  for await (const event of eventResults) {
    event.data = JSON.parse(event.data)
    if (event.data[category] === value) {
      events.push(event)
    }
  }
  return events
}

module.exports = {
  getFilteredEvents
}
