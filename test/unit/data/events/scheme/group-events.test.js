const enriched = require('../../../../mocks/events/enriched')
const processed = require('../../../../mocks/events/processed')
const submitted = require('../../../../mocks/events/submitted')
const acknowledged = require('../../../../mocks/events/acknowledged')

const { groupEventsByScheme } = require('../../../../../app/data/events/scheme/group-events-by-scheme')

let events

describe('group events by FRN', () => {
  beforeEach(() => {
    events = [enriched, processed, submitted, acknowledged]
  })

  test('test1', () => {
    const groupedEvents = groupEventsByScheme(events)
    console.log(groupedEvents)
  })

  test('should include scheme id in group', () => {
    const groupedEvents = groupEventsByScheme(events)
    expect(groupedEvents[0].schemeId).toBe(submitted.data.schemeId)
  })

  test('should include events in group', () => {
    const groupedEvents = groupEventsByScheme(events)
    expect(groupedEvents[0].events).toEqual(events)
  })
})
