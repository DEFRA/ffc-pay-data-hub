const {
  SFI, SFI_PILOT, LUMP_SUMS, VET_VISITS, CS, BPS, FDMR, SFI23, DELINKED, SFI_EXPANDED, COHT_REVENUE, COHT_CAPITAL
} = require('../../../../../app/constants/schemes')

const { orderGroupedEventsByScheme } = require('../../../../../app/data/events/scheme-id/order-grouped-events-by-scheme')

let groupedEvents

describe('order grouped events', () => {
  beforeEach(() => {
    const groupedEvent = structuredClone(require('../../../../mocks/events/grouped-event'))
    const createEvent = (schemeId) => ({ ...groupedEvent, schemeId })

    groupedEvents = [
      createEvent(BPS),
      createEvent(VET_VISITS),
      createEvent(SFI),
      createEvent(SFI_PILOT),
      createEvent(LUMP_SUMS),
      createEvent(CS),
      createEvent(FDMR),
      createEvent(SFI23),
      createEvent(DELINKED),
      createEvent(SFI_EXPANDED),
      createEvent(COHT_REVENUE),
      createEvent(COHT_CAPITAL)
    ]
  })

  test('should sort grouped events into ascending order by schemeId when all schemes present', () => {
    const orderedGroupedEvents = orderGroupedEventsByScheme(groupedEvents)
    const expectedOrder = [
      SFI, SFI_PILOT, LUMP_SUMS, VET_VISITS, CS, BPS, FDMR, SFI23, DELINKED, SFI_EXPANDED, COHT_REVENUE, COHT_CAPITAL
    ]

    orderedGroupedEvents.forEach((group, index) => {
      expect(group.schemeId).toEqual(expectedOrder[index])
    })
  })

  test('should sort grouped events into ascending order by schemeId when only two schemes present', () => {
    const groupedTwo = [{ ...groupedEvents[6] }, { ...groupedEvents[4] }] // FDMR, LUMP_SUMS
    const orderedGroupedTwo = orderGroupedEventsByScheme(groupedTwo)
    const expectedOrder = [LUMP_SUMS, FDMR]

    orderedGroupedTwo.forEach((group, index) => {
      expect(group.schemeId).toEqual(expectedOrder[index])
    })
  })
})
