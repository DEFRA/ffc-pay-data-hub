const enriched = require('../../../../mocks/events/enriched')
const processed = require('../../../../mocks/events/processed')
const submitted = require('../../../../mocks/events/submitted')
const acknowledged = require('../../../../mocks/events/acknowledged')
const { FRN } = require('../../../../mocks/values/frn')

const { groupEventsByFrn } = require('../../../../../app/data/events/frn/group-events')

let events

describe('group events by FRN', () => {
  beforeEach(() => {
    events = [enriched, processed, submitted, acknowledged]
  })

  test('should group events by FRN', () => {
    const groupedEvents = groupEventsByFrn(events)
    expect(groupedEvents.frn).toBe(FRN)
  })
})
