const submitted = require('../../../../mocks/events/submitted')

const { BPS, CS, SFI, SFI23, DELINKED, SFI_EXPANDED } = require('../../../../../app/constants/schemes')

const { groupEventsByScheme } = require('../../../../../app/data/events/scheme-id/group-events-by-scheme')

let events
let bpsEvents
let csEvents
let sfiEvents
let sfi23Events
let delinkedEvents
let esfioEvents
let mixedSchemeEvents

describe('group events by FRN', () => {
  beforeEach(() => {
    const createEventsForScheme = (scheme, events) => events.map((event) => {
      return {
        ...event,
        partitionKey: scheme
      }
    })

    events = [submitted, submitted]
    bpsEvents = createEventsForScheme(BPS, events)
    csEvents = createEventsForScheme(CS, events)
    sfiEvents = createEventsForScheme(SFI, events)
    sfi23Events = createEventsForScheme(SFI23, events)
    delinkedEvents = createEventsForScheme(DELINKED, events)
    esfioEvents = createEventsForScheme(SFI_EXPANDED, events)
    mixedSchemeEvents = [...bpsEvents, ...csEvents, ...sfiEvents, ...sfi23Events, ...delinkedEvents, ...esfioEvents]
  })

  test('should return schemeId equal to partitionKey for all events in eventGroup', () => {
    const groupedEvents = groupEventsByScheme(mixedSchemeEvents)
    groupedEvents.forEach(eventGroup => {
      eventGroup.events.forEach(event => expect(eventGroup.schemeId).toBe(event.partitionKey))
    })
  })
})
