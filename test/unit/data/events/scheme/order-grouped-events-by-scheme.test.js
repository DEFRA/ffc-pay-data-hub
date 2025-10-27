const { SFI, SFI_PILOT, LUMP_SUMS, VET_VISITS, CS, BPS, FDMR, SFI23, DELINKED, SFI_EXPANDED, COHT_REVENUE, COHT_CAPITAL } = require('../../../../../app/constants/schemes')

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
let delinkedEvent
let esfioEvent
let cohtREvent
let cohtCEvent

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
    delinkedEvent = { ...groupedEvent, schemeId: DELINKED }
    esfioEvent = { ...groupedEvent, schemeId: SFI_EXPANDED }
    cohtREvent = { ...groupedEvent, schemeId: COHT_REVENUE }
    cohtCEvent = { ...groupedEvent, schemeId: COHT_CAPITAL }
    groupedEvents = [bpsEvent, vetEvent, sfiEvent, sfiPilotEvent, lumpSumsEvent, csEvent, fdmrEvent, sfi23Event, delinkedEvent, esfioEvent, cohtREvent, cohtCEvent]
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
    expect(orderedGroupedEvents[8].schemeId).toEqual(DELINKED)
    expect(orderedGroupedEvents[9].schemeId).toEqual(SFI_EXPANDED)
    expect(orderedGroupedEvents[10].schemeId).toEqual(COHT_REVENUE)
    expect(orderedGroupedEvents[11].schemeId).toEqual(COHT_CAPITAL)
  })

  test('should sort grouped events into ascending order by schemeId when only two schemes present', () => {
    groupedEvents = [fdmrEvent, lumpSumsEvent]
    const orderedGroupedEvents = orderGroupedEventsByScheme(groupedEvents)
    expect(orderedGroupedEvents[0].schemeId).toEqual(LUMP_SUMS)
    expect(orderedGroupedEvents[1].schemeId).toEqual(FDMR)
  })
})
