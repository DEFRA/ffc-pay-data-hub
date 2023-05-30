const { FRN } = require('../../../../../mocks/values/frn')
const { INVOICE_NUMBER } = require('../../../../../mocks/values/invoice-number')
const { odata } = require('@azure/data-tables')

const { PAYMENT_EVENT, HOLD_EVENT, BATCH_EVENT, WARNING_EVENT } = require('../../../../../../app/constants/event-types')

// const { getEventsBySchemeId } = require('../../../../../../app/data/events/scheme-id/get-events-by-scheme-id')
const { initialise: initialiseTables, getClient } = require('../../../../../../app/storage')

let paymentClient
let holdClient
let batchClient
let warningClient

let paymentSubmittedEvent
// let holdEvent
// let batchEvent
// let warningEvent

beforeAll(async () => {
  await initialiseTables()
  paymentClient = getClient(PAYMENT_EVENT)
  holdClient = getClient(HOLD_EVENT)
  batchClient = getClient(BATCH_EVENT)
  warningClient = getClient(WARNING_EVENT)
})

beforeEach(async () => {
  paymentClient.deleteTable()
  holdClient.deleteTable()
  batchClient.deleteTable()
  warningClient.deleteTable()

  paymentClient.createTable()
  holdClient.createTable()
  batchClient.createTable()
  warningClient.createTable()

  paymentSubmittedEvent = JSON.parse(JSON.stringify(require('../../../../../mocks/events/submitted')))
  // holdEvent = JSON.parse(JSON.stringify(require('../../mocks/events/hold')))
  // batchEvent = JSON.parse(JSON.stringify(require('../../mocks/events/batch')))
  // warningEvent = JSON.parse(JSON.stringify(require('../../mocks/events/warning')))
})

const countAsyncIterator = async (iterator) => {
  let count = 0
  for await (const _ of iterator) { // eslint-disable-line no-unused-vars
    count++
  }
  return count
}

const formatAndAddEvent = async (tableClient, event, schemeId) => {
  const formattedEvent = {
    ...event,
    data: JSON.stringify(event.data),
    partitionKey: schemeId,
    rowKey: `${FRN}|${INVOICE_NUMBER}|157070221${Math.round(Math.random() * 10000)}`
  }
  await tableClient.createEntity(formattedEvent)
}

describe('get events by schemeId', () => {
  test('to aid development of putting data into tables', async () => {
    await formatAndAddEvent(paymentClient, paymentSubmittedEvent, '1')
    await formatAndAddEvent(paymentClient, paymentSubmittedEvent, '1')
    const results = paymentClient.listEntities({
      queryOptions: { filter: odata`PartitionKey eq '1'` }
    })
    const total = await countAsyncIterator(results)
    expect(total).toBe(2)
  })
})

// bulk add some events - what shcemes? what types?
// write the tests based on written code
