const { SFI, SFI_PILOT, LUMP_SUMS, VET_VISITS, CS, BPS, FDMR } = require('../../../../../app/constants/schemes')

const { orderGroupedEventsByScheme } = require('../../../../../app/data/events/scheme-id/order-grouped-events-by-scheme')

let groupedEvent
let groupedEvents

let sfiEvent
let sfiPilotEvent
let lumpSumsEvent
let vetEvent
let csEvent
let bpsEvent
let fdmrEvent

describe('order grouped events', () => {
  beforeEach(() => {
    groupedEvent = JSON.parse(JSON.stringify(require('../../../../mocks/events/grouped-event')))
    sfiEvent = { ...groupedEvent, schemeId: SFI }
    sfiPilotEvent = { ...groupedEvent, schemeId: SFI_PILOT }
    lumpSumsEvent = { ...groupedEvent, schemeId: LUMP_SUMS }
    vetEvent = { ...groupedEvent, schemeId: VET_VISITS }
    csEvent = { ...groupedEvent, schemeId: CS }
    bpsEvent = { ...groupedEvent, schemeId: BPS }
    fdmrEvent = { ...groupedEvent, schemeId: FDMR }
    groupedEvents = [bpsEvent, vetEvent, sfiEvent, sfiPilotEvent, lumpSumsEvent, csEvent, fdmrEvent]
  })

  test('should order grouped events into sequence by schemeId when all schemes present', () => {
    const orderedGroupedEvents = orderGroupedEventsByScheme(groupedEvents)
    expect(orderedGroupedEvents[0].schemeId).toEqual(SFI)
    expect(orderedGroupedEvents[1].schemeId).toEqual(SFI_PILOT)
    expect(orderedGroupedEvents[2].schemeId).toEqual(LUMP_SUMS)
    expect(orderedGroupedEvents[3].schemeId).toEqual(VET_VISITS)
    expect(orderedGroupedEvents[4].schemeId).toEqual(CS)
    expect(orderedGroupedEvents[5].schemeId).toEqual(BPS)
    expect(orderedGroupedEvents[6].schemeId).toEqual(FDMR)
  })

  test('should order grouped events into sequence by schemeId when only two schemes present', () => {
    groupedEvents = [fdmrEvent, lumpSumsEvent]
    const orderedGroupedEvents = orderGroupedEventsByScheme(groupedEvents)
    expect(orderedGroupedEvents[0].schemeId).toEqual(LUMP_SUMS)
    expect(orderedGroupedEvents[1].schemeId).toEqual(FDMR)
  })
})
