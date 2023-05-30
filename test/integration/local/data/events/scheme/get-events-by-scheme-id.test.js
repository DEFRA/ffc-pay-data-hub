const { odata } = require('@azure/data-tables')
const { FRN } = require('../../../../../mocks/values/frn')
const { INVOICE_NUMBER } = require('../../../../../mocks/values/invoice-number')
const { BPS, CS, SFI } = require('../../../../../../app/constants/schemes')

const { PAYMENT_EVENT, HOLD_EVENT, BATCH_EVENT, WARNING_EVENT } = require('../../../../../../app/constants/event-types')

// const { getEventsBySchemeId } = require('../../../../../../app/data/events/scheme-id/get-events-by-scheme-id')
const { initialise: initialiseTables, getClient } = require('../../../../../../app/storage')

let paymentClient
let holdClient
let batchClient
let warningClient

let paymentSubmittedEvent
let paymentProcessedEvent
let paymentEnrichedEvent
let paymentExtractedEvent

const formatAndAddEvent = async (tableClient, event, schemeId) => {
  const formattedEvent = {
    ...event,
    partitionKey: schemeId.toString(),
    rowKey: `${FRN}|${INVOICE_NUMBER}|157070221${Math.round(Math.random() * 10000)}`,
    data: JSON.stringify(event.data)
  }
  await tableClient.createEntity(formattedEvent)
}

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
  paymentProcessedEvent = JSON.parse(JSON.stringify(require('../../../../../mocks/events/processed')))
  paymentEnrichedEvent = JSON.parse(JSON.stringify(require('../../../../../mocks/events/enriched')))
  paymentExtractedEvent = JSON.parse(JSON.stringify(require('../../../../../mocks/events/extracted')))

  await formatAndAddEvent(paymentClient, paymentSubmittedEvent, SFI)
  await formatAndAddEvent(paymentClient, paymentSubmittedEvent, SFI)
  await formatAndAddEvent(paymentClient, paymentProcessedEvent, SFI)
  await formatAndAddEvent(paymentClient, paymentEnrichedEvent, SFI)
  await formatAndAddEvent(paymentClient, paymentExtractedEvent, SFI)

  formatAndAddEvent(paymentClient, paymentSubmittedEvent, CS)
  formatAndAddEvent(paymentClient, paymentSubmittedEvent, CS)
  formatAndAddEvent(paymentClient, paymentProcessedEvent, CS)
  formatAndAddEvent(paymentClient, paymentEnrichedEvent, CS)
  formatAndAddEvent(paymentClient, paymentExtractedEvent, CS)

  formatAndAddEvent(paymentClient, paymentSubmittedEvent, BPS)
  formatAndAddEvent(paymentClient, paymentSubmittedEvent, BPS)
  formatAndAddEvent(paymentClient, paymentProcessedEvent, BPS)
  formatAndAddEvent(paymentClient, paymentEnrichedEvent, BPS)
  formatAndAddEvent(paymentClient, paymentExtractedEvent, BPS)
})

const countAsyncIterator = async (iterator) => {
  let count = 0
  for await (const _ of iterator) { // eslint-disable-line no-unused-vars
    count++
  }
  return count
}

describe('get events by schemeId', () => {
  test('to aid development of putting data into tables', async () => {
    const results = paymentClient.listEntities({
      queryOptions: { filter: odata`PartitionKey eq '1'` }
    })
    const total = await countAsyncIterator(results)
    expect(total).toBe(5)
  })
})

// bulk add some events - what shcemes? what types?
// write the tests based on written code
