const { 1: SFI } = require('../../../../app/constants/scheme-names')
const { PAYMENT_ACKNOWLEDGED_STATUS, PAYMENT_ENRICHED_STATUS } = require('../../../../app/constants/statuses')
const { PAYMENT_ACKNOWLEDGED_NAME, PAYMENT_ENRICHED_NAME } = require('../../../../app/constants/names')
const { COMPLETED, IN_PROGRESS } = require('../../../../app/constants/states')

const extracted = require('../../../mocks/events/extracted')
const acknowledged = require('../../../mocks/events/acknowledged')
const enriched = require('../../../mocks/events/enriched')
const processed = require('../../../mocks/events/processed')
const submitted = require('../../../mocks/events/submitted')

const { sanitiseEvents } = require('../../../../app/data/events/sanitise-events')

let groupedEvent

describe('sanitise events', () => {
  beforeEach(() => {
    groupedEvent = JSON.parse(JSON.stringify(require('../../../mocks/events/grouped-event')))
    groupedEvent.events = [enriched, processed, submitted, acknowledged]
  })

  test('should return empty array if no events', () => {
    const result = sanitiseEvents([])
    expect(result).toHaveLength(0)
  })

  test('should include all group level properties', () => {
    const result = sanitiseEvents([groupedEvent])
    expect(result[0]).toMatchObject(groupedEvent)
  })

  test('should add scheme name', () => {
    const result = sanitiseEvents([groupedEvent])
    expect(result[0].scheme).toBe(SFI)
  })

  test('should add status name as last event status name', () => {
    const result = sanitiseEvents([groupedEvent])
    expect(result[0].status.name).toBe(PAYMENT_ACKNOWLEDGED_NAME)
  })

  test('should add status detail as last event status', () => {
    const result = sanitiseEvents([groupedEvent])
    expect(result[0].status.detail).toBe(PAYMENT_ACKNOWLEDGED_STATUS)
  })

  test('should add status state as last event detail', () => {
    const result = sanitiseEvents([groupedEvent])
    expect(result[0].status.state).toBe(COMPLETED)
  })

  test('should add status default as last event default', () => {
    const result = sanitiseEvents([groupedEvent])
    expect(result[0].status.default).toBe(true)
  })

  test('should add last updated as last event time formatted as string in London timezone', () => {
    const result = sanitiseEvents([groupedEvent])
    expect(result[0].lastUpdated).toBe('30/03/2023 01:00')
  })

  test('should include all events in group', () => {
    const result = sanitiseEvents([groupedEvent])
    expect(result[0].events).toHaveLength(4)
  })

  test('should include all event properties', () => {
    const result = sanitiseEvents([groupedEvent])
    expect(result[0].events[0]).toMatchObject(enriched)
  })

  test('should convert extracted value to pence', () => {
    groupedEvent.events = [extracted]
    const result = sanitiseEvents([groupedEvent])
    expect(result[0].events[0].data.value).toBe(100000)
  })

  test('should not convert non-extracted event to pence', () => {
    groupedEvent.events = [enriched]
    const result = sanitiseEvents([groupedEvent])
    expect(result[0].events[0].data.value).toBe(100000)
  })

  test('should add status name as event status name', () => {
    const result = sanitiseEvents([groupedEvent])
    expect(result[0].events[0].status.name).toBe(PAYMENT_ENRICHED_NAME)
  })

  test('should add status detail as event status', () => {
    const result = sanitiseEvents([groupedEvent])
    expect(result[0].events[0].status.detail).toBe(PAYMENT_ENRICHED_STATUS)
  })

  test('should add status state as event state', () => {
    const result = sanitiseEvents([groupedEvent])
    expect(result[0].events[0].status.state).toBe(IN_PROGRESS)
  })

  test('should add status default as event default', () => {
    const result = sanitiseEvents([groupedEvent])
    expect(result[0].events[0].status.default).toBe(true)
  })

  test('should add timestamp as event time formatted as string in London timezone', () => {
    const result = sanitiseEvents([groupedEvent])
    expect(result[0].events[0].timestamp).toBe('30/03/2023 01:00')
  })
})
