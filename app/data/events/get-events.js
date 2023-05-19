const { getClient, odata } = require('../../storage')
const { PAYMENT_EVENT } = require('../../constants/event-types')

// only get the events that have type of submitted
// amend this logic or create new function as this is reused by multiple
const getEvents = async (partitionKey, category) => {
  const client = getClient(PAYMENT_EVENT)
  const eventResults = client.listEntities({ queryOptions: { filter: odata`PartitionKey eq ${partitionKey.toString()} and category eq '${category}'` } })
  const events = []
  for await (const event of eventResults) {
    event.data = JSON.parse(event.data)
    events.push(event)
  }
  return events
}

module.exports = {
  getEvents
}
