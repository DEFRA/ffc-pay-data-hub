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

const submitted = require('../../../../mocks/events/submitted')
const groupedEvent = require('../../../../mocks/events/grouped-event')
const totalSchemeValues = require('../../../../mocks/total-scheme-values')

const { SCHEME_ID: SCHEME_ID_CATEGORY } = require('../../../../../app/constants/categories')

const { getEventsByScheme } = require('../../../../../app/data/events/scheme-id/get-events-by-scheme')
const { SFI } = require('../../../../../app/constants/schemes')

describe('get events by frn', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetSubmittedEvents.mockResolvedValue([submitted])
    mockGroupEventsByScheme.mockReturnValue([groupedEvent])
    mockGetTotalSchemeValues.mockReturnValue([totalSchemeValues])
    mockOrderGroupedEventsByScheme.mockReturnValue([totalSchemeValues])
  })

  test('should get events for schemeId', async () => {
    await getEventsByScheme(SFI)
    expect(mockGetSubmittedEvents).toHaveBeenCalledWith(SFI, SCHEME_ID_CATEGORY)
  })

  test('should group events by scheme', async () => {
    await getEventsByScheme(SFI)
    expect(mockGroupEventsByScheme).toHaveBeenCalledWith([submitted])
  })

  test('should get total values for scheme', async () => {
    await getEventsByScheme(SFI)
    expect(mockGetTotalSchemeValues).toHaveBeenCalledWith([groupedEvent])
  })

  test('should order grouped events', async () => {
    await getEventsByScheme(SFI)
    expect(mockOrderGroupedEventsByScheme).toHaveBeenCalledWith([totalSchemeValues])
  })

  test('should sanitise events', async () => {
    await getEventsByScheme(SFI)
    expect(mockSanitiseSchemeData).toHaveBeenCalledWith([totalSchemeValues])
  })
})
