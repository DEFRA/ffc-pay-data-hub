jest.mock('../../../../../app/data/events/get-events')
const { getEvents: mockGetEvents } = require('../../../../../app/data/events/get-events')

jest.mock('../../../../../app/data/events/batch/group-events-by-frn')
const { groupEventsByFrn: mockGroupEventsByFrn } = require('../../../../../app/data/events/batch/group-events-by-frn')

jest.mock('../../../../../app/data/events/order-grouped-events')
const { orderGroupedEvents: mockOrderGroupedEvents } = require('../../../../../app/data/events/order-grouped-events')

jest.mock('../../../../../app/data/events/sanitise-events')
const { sanitiseEvents: mockSanitiseEvents } = require('../../../../../app/data/events/sanitise-events')

jest.mock('../../../../../app/data/events/add-values')
const { addValues: mockAddValues } = require('../../../../../app/data/events/add-values')

const { BATCH: BATCH_VALUE } = require('../../../../mocks/values/batch')
const { BATCH: BATCH_CATEGORY } = require('../../../../../app/constants/categories')
const enriched = require('../../../../mocks/events/enriched')
const groupedEvent = require('../../../../mocks/events/grouped-event')

const { getEventsByBatch } = require('../../../../../app/data/events/batch/get-events-by-batch')

describe('get events by batch', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetEvents.mockResolvedValue([enriched])
    mockGroupEventsByFrn.mockReturnValue(groupedEvent)
    mockOrderGroupedEvents.mockReturnValue(groupedEvent)
    mockSanitiseEvents.mockReturnValue(groupedEvent)
  })

  test('should get events for batch', async () => {
    await getEventsByBatch(BATCH_VALUE)
    expect(mockGetEvents).toHaveBeenCalledWith(BATCH_VALUE, BATCH_CATEGORY)
  })

  test('should group events by FRN', async () => {
    await getEventsByBatch(BATCH_VALUE)
    expect(mockGroupEventsByFrn).toHaveBeenCalledWith([enriched])
  })

  test('should order grouped events', async () => {
    await getEventsByBatch(BATCH_VALUE)
    expect(mockOrderGroupedEvents).toHaveBeenCalledWith(groupedEvent)
  })

  test('should sanitise events', async () => {
    await getEventsByBatch(BATCH_VALUE)
    expect(mockSanitiseEvents).toHaveBeenCalledWith(groupedEvent)
  })

  test('should add values to events', async () => {
    await getEventsByBatch(BATCH_VALUE)
    expect(mockAddValues).toHaveBeenCalledWith(groupedEvent)
  })
})
