const { BPS, CS, SFI } = require('../../../../../app/constants/schemes')
const enriched = require('../../../../mocks/events/enriched')
const processed = require('../../../../mocks/events/processed')
const submitted = require('../../../../mocks/events/submitted')
const acknowledged = require('../../../../mocks/events/acknowledged')

const { groupEventsByScheme } = require('../../../../../app/data/events/scheme/group-events-by-scheme')

let events
let bpsEvents
let csEvents
let sfiEvents
let mixedSchemeEvents

describe('group events by FRN', () => {
  beforeEach(() => {
    const createEventsForScheme = (scheme, events) => events.map((event) => {
      return {
        ...event,
        partitionKey: scheme
      }
    })

    events = [enriched, processed, submitted, acknowledged]
    bpsEvents = createEventsForScheme(BPS, events)
    csEvents = createEventsForScheme(CS, events)
    sfiEvents = createEventsForScheme(SFI, events)
    mixedSchemeEvents = [...bpsEvents, ...csEvents, ...sfiEvents]
  })

  test('test1', () => {
    console.log(mixedSchemeEvents)
    const groupedEvents = groupEventsByScheme(mixedSchemeEvents)
    console.log(groupedEvents)
  })

  test('returned schemeId should be equal to partitionKey of all events in eventGroup', () => {
    const groupedEvents = groupEventsByScheme(bpsEvents)
    groupedEvents.forEach(eventGroup => {
      eventGroup.events.forEach(event => expect(eventGroup.schemeId).toBe(event.partitionKey))
    })
  })

  // test('should split events by schemeId', () => {
  //   const groupedEvents = groupEventsByScheme(mixedSchemeEvents)
  //   expect(groupedEvents[0].events).toEqual(bpsEvents)
  // })
})
