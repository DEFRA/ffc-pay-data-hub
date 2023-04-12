const { PAYMENT_ENRICHED_NAME, PAYMENT_PROCESSED_NAME, PAYMENT_SUBMITTED_NAME, PAYMENT_ACKNOWLEDGED_NAME } = require('../../../../app/constants/names')

const enriched = require('../../../mocks/events/enriched')
const processed = require('../../../mocks/events/processed')
const submitted = require('../../../mocks/events/submitted')
const acknowledged = require('../../../mocks/events/acknowledged')

const { addPendingEvents } = require('../../../../app/data/events/add-pending-events')

let groupedEvent

describe('add pending events', () => {
  beforeEach(() => {
    groupedEvent = JSON.parse(JSON.stringify(require('../../../mocks/events/grouped-event')))
  })

  test('should add all default events if no events', () => {
    const result = addPendingEvents([groupedEvent])
    expect(result[0].events).toHaveLength(4)
  })

  test('should add enrichment event if no enrichment event', () => {
    const result = addPendingEvents([groupedEvent])
    expect(result[0].events[0].status.name).toBe(PAYMENT_ENRICHED_NAME)
  })

  test('should not add enrichment event if enrichment event already exists', () => {
    groupedEvent.events = [enriched]
    const result = addPendingEvents([groupedEvent])
    expect(result[0].events).toHaveLength(4)
  })

  test('should add processed event if no processed event', () => {
    const result = addPendingEvents([groupedEvent])
    expect(result[0].events[1].status.name).toBe(PAYMENT_PROCESSED_NAME)
  })

  test('should not add processed event if processed event already exists', () => {
    groupedEvent.events = [processed]
    const result = addPendingEvents([groupedEvent])
    expect(result[0].events).toHaveLength(4)
  })

  test('should add submitted event if no submitted event', () => {
    const result = addPendingEvents([groupedEvent])
    expect(result[0].events[2].status.name).toBe(PAYMENT_SUBMITTED_NAME)
  })

  test('should not add submitted event if submitted event already exists', () => {
    groupedEvent.events = [submitted]
    const result = addPendingEvents([groupedEvent])
    expect(result[0].events).toHaveLength(4)
  })

  test('should add acknowledged event if no acknowledged event', () => {
    const result = addPendingEvents([groupedEvent])
    expect(result[0].events[3].status.name).toBe(PAYMENT_ACKNOWLEDGED_NAME)
  })

  test('should not add acknowledged event if acknowledged event already exists', () => {
    groupedEvent.events = [acknowledged]
    const result = addPendingEvents([groupedEvent])
    expect(result[0].events).toHaveLength(4)
  })
})
