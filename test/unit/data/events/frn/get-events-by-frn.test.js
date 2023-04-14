jest.mock('../../../../../app/data/events/get-events')
const { getEvents: mockGetEvents } = require('../../../../../app/data/events/get-events')

jest.mock('../../../../../app/data/events/frn/group-events-by-frn')
const { groupEventsByFrn: mockGroupEventsByFrn } = require('../../../../../app/data/events/frn/group-events-by-frn')

jest.mock('../../../../../app/data/events/frn/order-grouped-events')
const { orderGroupedEvents: mockOrderGroupedEvents } = require('../../../../../app/data/events/frn/order-grouped-events')

jest.mock('../../../../../app/data/events/sanitise-events')
const { sanitiseEvents: mockSanitiseEvents } = require('../../../../../app/data/events/sanitise-events')

const { FRN: FRN_VALUE } = require('../../../../mocks/values/frn')
const { FRN: FRN_CATEGORY } = require('../../../../../app/constants/categories')
const enriched = require('../../../../mocks/events/enriched')
const groupedEvent = require('../../../../mocks/events/grouped-event')

const { getEventsByFrn } = require('../../../../../app/data/events/frn/get-events-by-frn')

describe('get events by frn', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetEvents.mockResolvedValue([enriched])
    mockGroupEventsByFrn.mockReturnValue(groupedEvent)
    mockOrderGroupedEvents.mockReturnValue(groupedEvent)
  })

  test('should get events for FRN', async () => {
    await getEventsByFrn(FRN_VALUE)
    expect(mockGetEvents).toHaveBeenCalledWith(FRN_VALUE, FRN_CATEGORY)
  })

  test('should group events by FRN', async () => {
    await getEventsByFrn(FRN_VALUE)
    expect(mockGroupEventsByFrn).toHaveBeenCalledWith([enriched])
  })

  test('should order grouped events', async () => {
    await getEventsByFrn(FRN_VALUE)
    expect(mockOrderGroupedEvents).toHaveBeenCalledWith(groupedEvent)
  })

  test('should sanitise events', async () => {
    await getEventsByFrn(FRN_VALUE)
    expect(mockSanitiseEvents).toHaveBeenCalledWith(groupedEvent)
  })
})
