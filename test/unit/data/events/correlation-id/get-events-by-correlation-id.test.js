jest.mock('../../../../../app/data/events/get-events')
const { getEvents: mockGetEvents } = require('../../../../../app/data/events/get-events')

jest.mock('../../../../../app/data/events/correlation-id/group-events')
const { groupEventsByCorrelationId: mockGroupEventsByCorrelationId } = require('../../../../../app/data/events/correlation-id/group-events')

jest.mock('../../../../../app/data/events/correlation-id/order-grouped-events')
const { orderGroupedEvents: mockOrderGroupedEvents } = require('../../../../../app/data/events/correlation-id/order-grouped-events')

jest.mock('../../../../../app/data/events/sanitise-events')
const { sanitiseEvents: mockSanitiseEvents } = require('../../../../../app/data/events/sanitise-events')

jest.mock('../../../../../app/data/events/add-pending-events')
const { addPendingEvents: mockAddPendingEvents } = require('../../../../../app/data/events/add-pending-events')

const { CORRELATION_ID: CORRELATION_ID_VALUE } = require('../../../../mocks/values/correlation-id')
const { CORRELATION_ID: CORRELATION_ID_CATEGORY } = require('../../../../../app/constants/categories')
const enriched = require('../../../../mocks/events/enriched')
const groupedEvent = require('../../../../mocks/events/grouped-event')

const { getEventsByCorrelationId } = require('../../../../../app/data/events/correlation-id/get-events-by-correlation-id')

describe('get events by correlation id', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetEvents.mockResolvedValue([enriched])
    mockGroupEventsByCorrelationId.mockReturnValue(groupedEvent)
    mockOrderGroupedEvents.mockReturnValue(groupedEvent)
    mockSanitiseEvents.mockReturnValue(groupedEvent)
    mockAddPendingEvents.mockReturnValue([groupedEvent])
  })

  test('should get events for FRN', async () => {
    await getEventsByCorrelationId(CORRELATION_ID_VALUE)
    expect(mockGetEvents).toHaveBeenCalledWith(CORRELATION_ID_VALUE, CORRELATION_ID_CATEGORY)
  })

  test('should group events by FRN', async () => {
    await getEventsByCorrelationId(CORRELATION_ID_VALUE)
    expect(mockGroupEventsByCorrelationId).toHaveBeenCalledWith([enriched])
  })

  test('should order grouped events', async () => {
    await getEventsByCorrelationId(CORRELATION_ID_VALUE)
    expect(mockOrderGroupedEvents).toHaveBeenCalledWith(groupedEvent)
  })

  test('should sanitise events', async () => {
    await getEventsByCorrelationId(CORRELATION_ID_VALUE)
    expect(mockSanitiseEvents).toHaveBeenCalledWith(groupedEvent)
  })

  test('should add pending events', async () => {
    await getEventsByCorrelationId(CORRELATION_ID_VALUE)
    expect(mockAddPendingEvents).toHaveBeenCalledWith(groupedEvent)
  })

  test('should return first group event only', async () => {
    const events = await getEventsByCorrelationId(CORRELATION_ID_VALUE)
    expect(events).toEqual(groupedEvent)
  })
})
