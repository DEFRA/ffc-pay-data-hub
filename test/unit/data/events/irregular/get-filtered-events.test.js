jest.mock('../../../../../app/storage')
const { getClient: mockGetClient, odata: mockOdata } = require('../../../../../app/storage')

const mockListEntities = jest.fn()

const mockTableClient = {
  listEntities: mockListEntities
}

const { CORRELATION_ID } = require('../../../../../app/constants/categories')
const { PAYMENT_EVENT } = require('../../../../../app/constants/event-types')
const { stringifyEventData } = require('../../../../helpers/stringify-event-data')

const { getFilteredEvents } = require('../../../../../app/data/events/irregular/get-filtered-events')
const { INVOICE_NUMBER } = require('../../../../mocks/values/invoice-number')

let extractedEvent
let enrichedEvent
let events

const category = 'invoiceNumber'
const value = INVOICE_NUMBER

describe('get filtered events', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    extractedEvent = JSON.parse(JSON.stringify(require('../../../../mocks/events/extracted')))
    enrichedEvent = JSON.parse(JSON.stringify(require('../../../../mocks/events/enriched')))
    stringifyEventData(extractedEvent)
    stringifyEventData(enrichedEvent)

    events = [extractedEvent, enrichedEvent]

    mockGetClient.mockReturnValue(mockTableClient)
    mockListEntities.mockReturnValue(events)
  })

  test('should get payment client', async () => {
    await getFilteredEvents(category, value)
    expect(mockGetClient).toHaveBeenCalledTimes(1)
  })

  test('should get payment client once', async () => {
    await getFilteredEvents(category, value)
    expect(mockGetClient).toHaveBeenCalledTimes(1)
  })

  test('should get payment client with payment event type', async () => {
    await getFilteredEvents(category, value)
    expect(mockGetClient).toHaveBeenCalledWith(PAYMENT_EVENT)
  })

  test('should get payment events once', async () => {
    await getFilteredEvents(category, value)
    expect(mockListEntities).toHaveBeenCalledTimes(1)
  })

  test('should get payment events with correlation id category', async () => {
    await getFilteredEvents(category, value)
    expect(mockListEntities).toHaveBeenCalledWith({ queryOptions: { filter: mockOdata`category eq '${CORRELATION_ID}'` } })
  })

  test('should return all payment events that match the filter', async () => {
    const result = await getFilteredEvents(category, value)
    expect(result.length).toBe(2)
  })

  test('should convert event data to json', async () => {
    const result = await getFilteredEvents(category, value)
    expect(result[0].data).toEqual(extractedEvent.data)
    expect(result[1].data).toEqual(enrichedEvent.data)
  })

  test('should return an empty array if no events match the filter', async () => {
    mockListEntities.mockReturnValue([])
    const result = await getFilteredEvents(category, value)
    expect(result.length).toBe(0)
  })

  test('should return events that match the given category and value', async () => {
    extractedEvent = JSON.parse(JSON.stringify(require('../../../../mocks/events/extracted')))
    enrichedEvent = JSON.parse(JSON.stringify(require('../../../../mocks/events/enriched')))
    enrichedEvent.data.invoiceNumber = 'Invoice001'
    stringifyEventData(extractedEvent)
    stringifyEventData(enrichedEvent)

    events = [extractedEvent, enrichedEvent]

    mockGetClient.mockReturnValue(mockTableClient)
    mockListEntities.mockReturnValue(events)

    const result = await getFilteredEvents(category, value)
    expect(result.length).toBe(1)
    expect(result[0].data).toEqual(extractedEvent.data)
  })
})
