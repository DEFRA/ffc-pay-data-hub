const { getFilteredEventsForCategory } = require('../../../../../app/data/events/irregular/get-filtered-events-for-category')
const { getFilteredEvents } = require('../../../../../app/data/events/irregular/get-filtered-events')
const { orderGroupedEvents } = require('../../../../../app/data/events/order-grouped-events')
const { sanitiseEvents } = require('../../../../../app/data/events/sanitise-events')
const { groupEventsByCorrelationId } = require('../../../../../app/data/events/group-events-by-correlation-id')

jest.mock('../../../../../app/data/events/irregular/get-filtered-events')
jest.mock('../../../../../app/data/events/order-grouped-events')
jest.mock('../../../../../app/data/events/sanitise-events')
jest.mock('../../../../../app/data/events/group-events-by-correlation-id')

describe('get filtered events for given category', () => {
  const category = 'someCategory'
  const value = 'someValue'
  const events = [{ id: 1, correlationId: 'a' }, { id: 2, correlationId: 'b' }]
  const groupedEvents = {
    a: [{ id: 1, correlationId: 'a' }],
    b: [{ id: 2, correlationId: 'b' }]
  }
  const orderedEvents = [{ id: 2, correlationId: 'b' }, { id: 1, correlationId: 'a' }]
  const sanitisedEvents = [{ id: 1, correlationId: 'a', sanitized: true }, { id: 2, correlationId: 'b', sanitized: true }]

  beforeEach(() => {
    getFilteredEvents.mockResolvedValue(events)
    groupEventsByCorrelationId.mockReturnValue(groupedEvents)
    orderGroupedEvents.mockReturnValue(orderedEvents)
    sanitiseEvents.mockReturnValue(sanitisedEvents)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should call getFilteredEvents with the correct category and value', async () => {
    await getFilteredEventsForCategory(category, value)
    expect(getFilteredEvents).toHaveBeenCalledWith(category, value)
  })

  test('should group the events by correlation id', async () => {
    await getFilteredEventsForCategory(category, value)
    expect(groupEventsByCorrelationId).toHaveBeenCalledWith(events)
  })

  test('should order the grouped events', async () => {
    await getFilteredEventsForCategory(category, value)
    expect(orderGroupedEvents).toHaveBeenCalledWith(groupedEvents)
  })

  test('should sanitise the ordered events', async () => {
    await getFilteredEventsForCategory(category, value)
    expect(sanitiseEvents).toHaveBeenCalledWith(orderedEvents)
  })

  test('should return sanitised events', async () => {
    const result = await getFilteredEventsForCategory(category, value)
    expect(result).toEqual(sanitisedEvents)
  })
})
