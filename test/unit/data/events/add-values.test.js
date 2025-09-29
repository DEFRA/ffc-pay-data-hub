jest.mock('../../../../app/currency')
const { convertToString: mockConvertToString } = require('../../../../app/currency')

const acknowledged = require('../../../mocks/events/acknowledged')
const enriched = require('../../../mocks/events/enriched')
const processed = require('../../../mocks/events/processed')
const submitted = require('../../../mocks/events/submitted')

const { addValues } = require('../../../../app/data/events/add-values')
const { FC } = require('../../../../app/constants/schemes')

let groupedEvent

describe('add value to events', () => {
  beforeEach(() => {
    groupedEvent = JSON.parse(JSON.stringify(require('../../../mocks/events/grouped-event')))
    groupedEvent.events = [enriched, processed, submitted, acknowledged]
    mockConvertToString.mockImplementation(value => value ? value.toString() : 0)
  })

  test('should return empty array if no events', () => {
    const result = addValues([])
    expect(result).toHaveLength(0)
  })

  test('should include all existing group level properties', () => {
    const result = addValues([groupedEvent])
    expect(result[0]).toMatchObject(groupedEvent)
  })

  test('should add original value from first event', () => {
    const result = addValues([groupedEvent])
    expect(result[0].originalValue).toBe(enriched.data.value)
  })

  test('should add original value formatted as string', () => {
    const result = addValues([groupedEvent])
    expect(result[0].originalValueText).toBe(enriched.data.value.toString())
  })

  test('should add current value from last event', () => {
    const result = addValues([groupedEvent])
    expect(result[0].currentValue).toBe(acknowledged.data.value)
  })

  test('should add current value formatted as string', () => {
    const result = addValues([groupedEvent])
    expect(result[0].currentValueText).toBe(acknowledged.data.value.toString())
  })

  test('should add original value from second event if first is absent for FC', () => {
    delete groupedEvent.events[0].data.value
    groupedEvent.events[0].data.schemeId = FC
    const result = addValues([groupedEvent])
    expect(result[0].originalValue).toBe(processed.data.value)
  })

  test('should add original value formatted as string from second event if first is absent for FC', () => {
    delete groupedEvent.events[0].data.value
    groupedEvent.events[0].data.schemeId = FC
    groupedEvent.events[1].data.value = 999
    const result = addValues([groupedEvent])
    expect(result[0].originalValueText).toBe(processed.data.value.toString())
  })
})
