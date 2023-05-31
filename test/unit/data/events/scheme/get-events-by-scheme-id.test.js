jest.mock('../../../../../app/data/events/scheme-id/get-submitted-events')
const { getSubmittedEvents: mockGetSubmittedEvents } = require('../../../../../app/data/events/scheme-id/get-submitted-events')

jest.mock('../../../../../app/data/events/scheme-id/group-events-by-scheme')
const { groupEventsByScheme: mockGroupEventsByScheme } = require('../../../../../app/data/events/scheme-id/group-events-by-scheme')

jest.mock('../../../../../app/data/events/scheme-id/order-grouped-events-by-scheme')
const { orderGroupedEventsByScheme: mockOrderGroupedEventsByScheme } = require('../../../../../app/data/events/scheme-id/order-grouped-events-by-scheme')

jest.mock('../../../../../app/data/events/scheme-id/get-total-scheme-values')
const { getTotalSchemeValues: mockGetTotalSchemeValues } = require('../../../../../app/data/events/scheme-id/get-total-scheme-values')

jest.mock('../../../../../app/data/events/scheme-id/sanitise-scheme-data')
const { sanitiseSchemeData: mockSanitiseSchemeData } = require('../../../../../app/data/events/scheme-id/sanitise-scheme-data')

const { SCHEME_ID: SCHEME_ID_CATEGORY } = require('../../../../../app/constants/categories')
const submitted = require('../../../../mocks/events/submitted')
const groupedEvent = require('../../../../mocks/events/grouped-event')
const totalSchemeValues = require('../../../../mocks/events/total-scheme-values')

const { getEventsBySchemeId } = require('../../../../../app/data/events/scheme-id/get-events-by-scheme-id')

describe('get events by frn', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetSubmittedEvents.mockResolvedValue([submitted])
    mockGroupEventsByScheme.mockReturnValue([groupedEvent])
    mockGetTotalSchemeValues.mockReturnValue([totalSchemeValues])
    mockOrderGroupedEventsByScheme.mockReturnValue([totalSchemeValues])
  })

  test('should get events for schemeId', async () => {
    await getEventsBySchemeId()
    console.log(mockGetSubmittedEvents.mockResolvedValue)
    expect(mockGetSubmittedEvents).toHaveBeenCalledWith(SCHEME_ID_CATEGORY)
  })

  test('should group events by scheme', async () => {
    await getEventsBySchemeId()
    expect(mockGroupEventsByScheme).toHaveBeenCalledWith([submitted])
  })

  test('should get total values for scheme', async () => {
    await getEventsBySchemeId()
    expect(mockGetTotalSchemeValues).toHaveBeenCalledWith([groupedEvent])
  })

  test('should order grouped events', async () => {
    await getEventsBySchemeId()
    expect(mockOrderGroupedEventsByScheme).toHaveBeenCalledWith([totalSchemeValues])
  })

  test('should sanitise events', async () => {
    await getEventsBySchemeId()
    expect(mockSanitiseSchemeData).toHaveBeenCalledWith([totalSchemeValues])
  })
})
