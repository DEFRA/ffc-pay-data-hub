const { getClient, odata } = require('../../../storage')
const { PAYMENT_EVENT } = require('../../../constants/event-types')
const submittedEvent = 'uk.gov.defra.ffc.pay.payment.submitted'

// only get the events that have type of submitted
// amend this logic or create new function as this is reused by multiple
const getSubmittedEvents = async (partitionKey, category) => {
  const client = getClient(PAYMENT_EVENT)
  const eventResults = client.listEntities({ queryOptions: { filter: odata`PartitionKey eq ${partitionKey.toString()} and category eq '${category}' and type eq '${submittedEvent}'` } })
  const events = []
  for await (const event of eventResults) {
    event.data = JSON.parse(event.data)
    events.push(event)
  }
  return events
}

module.exports = {
  getSubmittedEvents
}
