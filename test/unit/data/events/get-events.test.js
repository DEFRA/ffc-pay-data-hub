jest.mock('../../../../app/storage')
const { getClient: mockGetClient, odata: mockOdata } = require('../../../../app/storage')

const mockListEntities = jest.fn()

const mockTableClient = {
  listEntities: mockListEntities
}

const { PARTITION_KEY } = require('../../../mocks/values/partition-key')
const { CATEGORY } = require('../../../mocks/values/category')

const { PAYMENT_EVENT } = require('../../../../app/constants/event-types')

const { stringifyEventData } = require('../../../helpers/stringify-event-data')

const { getEvents } = require('../../../../app/data/events/get-events')

let extractedEvent
let enrichedEvent
let events

describe('get events', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    extractedEvent = JSON.parse(JSON.stringify(require('../../../mocks/events/extracted')))
    enrichedEvent = JSON.parse(JSON.stringify(require('../../../mocks/events/enriched')))

    stringifyEventData(extractedEvent)
    stringifyEventData(enrichedEvent)

    events = [extractedEvent, enrichedEvent]

    mockGetClient.mockReturnValue(mockTableClient)
    mockListEntities.mockReturnValue(events)
  })

  test('should get payment client', async () => {
    await getEvents(PARTITION_KEY, CATEGORY)
    expect(mockGetClient).toHaveBeenCalledTimes(1)
  })

  test('should get payment client once', async () => {
    await getEvents(PARTITION_KEY, CATEGORY)
    expect(mockGetClient).toHaveBeenCalledTimes(1)
  })

  test('should get payment client with payment event type', async () => {
    await getEvents(PARTITION_KEY, CATEGORY)
    expect(mockGetClient).toHaveBeenCalledWith(PAYMENT_EVENT)
  })

  test('should get payment events once', async () => {
    await getEvents(PARTITION_KEY, CATEGORY)
    expect(mockListEntities).toHaveBeenCalledTimes(1)
  })

  test('should get payment events with correlation id category', async () => {
    await getEvents(PARTITION_KEY, CATEGORY)
    expect(mockListEntities).toHaveBeenCalledWith({ queryOptions: { filter: mockOdata`category eq 'correlationId'` } })
  })

  test('should return all payment events', async () => {
    const result = await getEvents(PARTITION_KEY, CATEGORY)
    expect(result.length).toBe(2)
  })

  test('should convert event data to json', async () => {
    const result = await getEvents(PARTITION_KEY, CATEGORY)
    expect(result[0].data).toEqual(extractedEvent.data)
    expect(result[1].data).toEqual(enrichedEvent.data)
  })

  test('should return an empty array if no events', async () => {
    mockListEntities.mockReturnValue([])
    const result = await getEvents(PARTITION_KEY, CATEGORY)
    expect(result.length).toBe(0)
  })
})
