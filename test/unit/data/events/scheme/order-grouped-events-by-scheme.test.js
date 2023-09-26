const { SFI, SFI_PILOT, LUMP_SUMS, VET_VISITS, CS, BPS, FDMR, SFI23 } = require('../../../../../app/constants/schemes')

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
let sfi23Event

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
    sfi23Event = { ...groupedEvent, schemeId: SFI23 }
    groupedEvents = [bpsEvent, vetEvent, sfiEvent, sfiPilotEvent, lumpSumsEvent, csEvent, fdmrEvent, sfi23Event]
  })

  test('should sort grouped events into ascending order by schemeId when all schemes present', () => {
    const orderedGroupedEvents = orderGroupedEventsByScheme(groupedEvents)
    expect(orderedGroupedEvents[0].schemeId).toEqual(SFI)
    expect(orderedGroupedEvents[1].schemeId).toEqual(SFI_PILOT)
    expect(orderedGroupedEvents[2].schemeId).toEqual(LUMP_SUMS)
    expect(orderedGroupedEvents[3].schemeId).toEqual(VET_VISITS)
    expect(orderedGroupedEvents[4].schemeId).toEqual(CS)
    expect(orderedGroupedEvents[5].schemeId).toEqual(BPS)
    expect(orderedGroupedEvents[6].schemeId).toEqual(FDMR)
    expect(orderedGroupedEvents[7].schemeId).toEqual(SFI23)
  })

  test('should sort grouped events into ascending order by schemeId when only two schemes present', () => {
    groupedEvents = [fdmrEvent, lumpSumsEvent]
    const orderedGroupedEvents = orderGroupedEventsByScheme(groupedEvents)
    expect(orderedGroupedEvents[0].schemeId).toEqual(LUMP_SUMS)
    expect(orderedGroupedEvents[1].schemeId).toEqual(FDMR)
  })
})
