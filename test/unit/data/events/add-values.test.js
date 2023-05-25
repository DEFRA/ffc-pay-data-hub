jest.mock('../../../../app/currency')
const { convertToString: mockConvertToString } = require('../../../../app/currency')

const acknowledged = require('../../../mocks/events/acknowledged')
const enriched = require('../../../mocks/events/enriched')
const processed = require('../../../mocks/events/processed')
const submitted = require('../../../mocks/events/submitted')

const { addValues } = require('../../../../app/data/events/add-values')

let groupedEvent

describe('add value to events', () => {
  beforeEach(() => {
    groupedEvent = JSON.parse(JSON.stringify(require('../../../mocks/events/grouped-event')))
    groupedEvent.events = [enriched, processed, submitted, acknowledged]
    mockConvertToString.mockImplementation(value => value.toString())
  })

  test('should return empty array if no events', () => {
    const result = addValues([])
    expect(result).toHaveLength(0)
  })

  test('should include all group level properties', () => {
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
})
