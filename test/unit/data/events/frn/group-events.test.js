const enriched = require('../../../../mocks/events/enriched')
const processed = require('../../../../mocks/events/processed')
const submitted = require('../../../../mocks/events/submitted')
const acknowledged = require('../../../../mocks/events/acknowledged')
const { PARTITION_KEY } = require('../../../../mocks/values/partition-key')

const { groupEventsByFrn } = require('../../../../../app/data/events/frn/group-events')
const { CORRELATION_ID } = require('../../../../mocks/values/correlation-id')
const {ROW_KEY} = require('../../../../mocks/values/row-key')

let events

describe('group events by FRN', () => {
  beforeEach(() => {
    events = [enriched, processed, submitted, acknowledged]
  })

  test('should group events with partition key as FRN', () => {
    const groupedEvents = groupEventsByFrn(events)
    expect(groupedEvents[0].frn).toBe(PARTITION_KEY)
  })

  test('should include events with first element of row key as correlation id', () => {
    const groupedEvents = groupEventsByFrn(events)
    expect(groupedEvents[0].correlationId).toBe(ROW_KEY.split('|')[0])
  })

  
})
