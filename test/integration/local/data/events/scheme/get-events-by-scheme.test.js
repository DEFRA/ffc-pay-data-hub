const { FRN } = require('../../../../../mocks/values/frn')
const { INVOICE_NUMBER } = require('../../../../../mocks/values/invoice-number')

const { BPS, CS, SFI, SFI23 } = require('../../../../../../app/constants/schemes')
const { PAYMENT_EVENT, HOLD_EVENT, BATCH_EVENT, WARNING_EVENT } = require('../../../../../../app/constants/event-types')
const schemeNames = require('../../../../../../app/constants/scheme-names')

const { getEventsByScheme } = require('../../../../../../app/data/events/scheme-id/get-events-by-scheme')
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
    data: JSON.stringify(event.data),
    category: 'schemeId'
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

  await formatAndAddEvent(paymentClient, paymentSubmittedEvent, CS)
  await formatAndAddEvent(paymentClient, paymentSubmittedEvent, CS)
  await formatAndAddEvent(paymentClient, paymentProcessedEvent, CS)
  await formatAndAddEvent(paymentClient, paymentEnrichedEvent, CS)
  await formatAndAddEvent(paymentClient, paymentExtractedEvent, CS)

  await formatAndAddEvent(paymentClient, paymentSubmittedEvent, BPS)
  await formatAndAddEvent(paymentClient, paymentSubmittedEvent, BPS)
  await formatAndAddEvent(paymentClient, paymentProcessedEvent, BPS)
  await formatAndAddEvent(paymentClient, paymentEnrichedEvent, BPS)
  await formatAndAddEvent(paymentClient, paymentExtractedEvent, BPS)

  await formatAndAddEvent(paymentClient, paymentSubmittedEvent, SFI23)
  await formatAndAddEvent(paymentClient, paymentSubmittedEvent, SFI23)
  await formatAndAddEvent(paymentClient, paymentProcessedEvent, SFI23)
  await formatAndAddEvent(paymentClient, paymentEnrichedEvent, SFI23)
  await formatAndAddEvent(paymentClient, paymentExtractedEvent, SFI23)
})

describe('get events by scheme', () => {
  test('should return data for SFI only', async () => {
    const result = await getEventsByScheme()
    console.log(result)
    expect(result[0].scheme).toBe(schemeNames[SFI])
  })

  test('should return total number of submitted payment request events for SFI only', async () => {
    const result = await getEventsByScheme()
    expect(result[0].paymentRequests).toBe(2)
  })

  test('should return total value of payment requests for SFI only', async () => {
    const result = await getEventsByScheme()
    expect(result[0].value).toBe('£2,000.00')
  })

  test('should return data for CS only', async () => {
    const result = await getEventsByScheme()
    console.log(result)
    expect(result[1].scheme).toBe(schemeNames[CS])
  })

  test('should return total number of submitted payment request events for CS only', async () => {
    const result = await getEventsByScheme()
    expect(result[1].paymentRequests).toBe(2)
  })

  test('should return total value of payment requests for CS only', async () => {
    const result = await getEventsByScheme()
    expect(result[1].value).toBe('£2,000.00')
  })

  test('should return data for BPS only', async () => {
    const result = await getEventsByScheme()
    console.log(result)
    expect(result[2].scheme).toBe(schemeNames[BPS])
  })

  test('should return total number of submitted payment request events for BPS only', async () => {
    const result = await getEventsByScheme()
    expect(result[2].paymentRequests).toBe(2)
  })

  test('should return total value of payment requests for BPS only', async () => {
    const result = await getEventsByScheme()
    expect(result[2].value).toBe('£2,000.00')
  })

  test('should return data for SFI23 only', async () => {
    const result = await getEventsByScheme()
    console.log(result)
    expect(result[3].scheme).toBe(schemeNames[SFI23])
  })

  test('should return total number of submitted payment request events for SFI23 only', async () => {
    const result = await getEventsByScheme()
    expect(result[3].paymentRequests).toBe(2)
  })

  test('should return total value of payment requests for SFI23 only', async () => {
    const result = await getEventsByScheme()
    expect(result[3].value).toBe('£2,000.00')
  })

  test('should order scheme data by schemeId', async () => {
    const result = await getEventsByScheme()
    expect(result[0].scheme).toBe(schemeNames[SFI])
    expect(result[1].scheme).toBe(schemeNames[CS])
    expect(result[2].scheme).toBe(schemeNames[BPS])
    expect(result[3].scheme).toBe(schemeNames[SFI23])
  })
})
