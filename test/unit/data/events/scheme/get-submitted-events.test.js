jest.mock('../../../../../app/storage')
const { getClient: mockGetClient, odata: mockOdata } = require('../../../../../app/storage')

const mockListEntities = jest.fn()

const mockTableClient = {
  listEntities: mockListEntities
}

const { PARTITION_KEY } = require('../../../../mocks/values/partition-key')

const { PAYMENT_SUBMITTED } = require('../../../../../app/constants/events')
const { PAYMENT_EVENT } = require('../../../../../app/constants/event-types')

const { stringifyEventData } = require('../../../../helpers/stringify-event-data')

const { getSubmittedEvents } = require('../../../../../app/data/events/scheme-id/get-submitted-events')

const category = 'schemeId'
let extractedEvent
let enrichedEvent
let events

describe('get events', () => {
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
    await getSubmittedEvents(PARTITION_KEY, category)
    expect(mockGetClient).toHaveBeenCalledTimes(1)
  })

  test('should get payment client once', async () => {
    await getSubmittedEvents(PARTITION_KEY, category)
    expect(mockGetClient).toHaveBeenCalledTimes(1)
  })

  test('should get payment client with payment event type', async () => {
    await getSubmittedEvents(PARTITION_KEY, category)
    expect(mockGetClient).toHaveBeenCalledWith(PAYMENT_EVENT)
  })

  test('should get payment events once', async () => {
    await getSubmittedEvents(PARTITION_KEY, category)
    expect(mockListEntities).toHaveBeenCalledTimes(1)
  })

  test('should get payment events with correlation id category', async () => {
    await getSubmittedEvents(PARTITION_KEY, category)
    expect(mockListEntities).toHaveBeenCalledWith({ queryOptions: { filter: mockOdata`category eq 'correlationId' and type eq 'uk.gov.defra.ffc.pay.payment.submitted'` } })
  })

  test('should return all payment events', async () => {
    const result = await getSubmittedEvents(PARTITION_KEY, category)
    expect(result.length).toBe(2)
  })

  test('should convert event data to json', async () => {
    const result = await getSubmittedEvents(PARTITION_KEY, category)
    expect(result[0].data).toEqual(extractedEvent.data)
    expect(result[1].data).toEqual(enrichedEvent.data)
  })

  test('should return an empty array if no events', async () => {
    mockListEntities.mockReturnValue([])
    const result = await getSubmittedEvents(PARTITION_KEY, category)
    expect(result.length).toBe(0)
  })

  test('should call mockListEntities with type of submitted ', async () => {
    await getSubmittedEvents(PARTITION_KEY, category)
    expect(mockTableClient.listEntities).toHaveBeenCalledWith({ queryOptions: { filter: mockOdata`category eq '${category}' and type eq '${PAYMENT_SUBMITTED}'` } })
  })
})
