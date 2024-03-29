const { PARTITION_KEY } = require('../../../../mocks/values/partition-key')
const { ROW_KEY } = require('../../../../mocks/values/row-key')
const enriched = require('../../../../mocks/events/enriched')
const processed = require('../../../../mocks/events/processed')
const submitted = require('../../../../mocks/events/submitted')
const acknowledged = require('../../../../mocks/events/acknowledged')

const { groupEventsByFrn } = require('../../../../../app/data/events/frn/group-events-by-frn')

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

  test('should include scheme id in group', () => {
    const groupedEvents = groupEventsByFrn(events)
    expect(groupedEvents[0].schemeId).toBe(enriched.data.schemeId)
  })

  test('should include payment request number in group', () => {
    const groupedEvents = groupEventsByFrn(events)
    expect(groupedEvents[0].paymentRequestNumber).toBe(enriched.data.paymentRequestNumber)
  })

  test('should include agreement number in group', () => {
    const groupedEvents = groupEventsByFrn(events)
    expect(groupedEvents[0].agreementNumber).toBe(enriched.data.agreementNumber)
  })

  test('should include marketing year in group', () => {
    const groupedEvents = groupEventsByFrn(events)
    expect(groupedEvents[0].marketingYear).toBe(enriched.data.marketingYear)
  })

  test('should include events in group', () => {
    const groupedEvents = groupEventsByFrn(events)
    expect(groupedEvents[0].events).toEqual(events)
  })
})
