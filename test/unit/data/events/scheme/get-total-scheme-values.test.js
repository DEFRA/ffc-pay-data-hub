const { getTotalSchemeValues } = require('../../../../../app/data/events/scheme-id/get-total-scheme-values')
const { BPS, CS } = require('../../../../../app/constants/schemes')
let submitted
let bpsEvent
let csEvent
let groupedEvents

describe('get events', () => {
  beforeEach(() => {
    submitted = require('../../../../mocks/events/submitted')
    bpsEvent = {
      ...submitted,
      partitionKey: BPS
    }

    csEvent = {
      ...submitted,
      partitionKey: CS
    }

    groupedEvents = [
      {
        schemeId: CS.toString(),
        events: [csEvent, csEvent, csEvent]
      },
      {
        schemeId: BPS.toString(),
        events: [bpsEvent, bpsEvent, bpsEvent]
      }
    ]
  })

  test('should return an array with two elements when groupedEvents has a length of two', () => {
    const result = getTotalSchemeValues(groupedEvents)
    expect(result.length).toBe(2)
  })

  test('should return array of objects with schemeId, paymentRequests and value', () => {
    const result = getTotalSchemeValues(groupedEvents)
    expect(result[0]).toStrictEqual({
      schemeId: '5',
      paymentRequests: 3,
      value: 300000
    })
  })

  test('total paymentRequests should equal number of events in each groupedEvent', () => {
    const result = getTotalSchemeValues(groupedEvents)
    expect(result[0].paymentRequests).toBe(groupedEvents[0].events.length)
  })

  test('schemeId should be equal to groupedEvents schemeId ', () => {
    const result = getTotalSchemeValues(groupedEvents)
    expect(result[0].schemeId).toBe(groupedEvents[0].schemeId)
  })

  test('value should be equal to sum of events values when there are 3 events', () => {
    const result = getTotalSchemeValues(groupedEvents)
    expect(result[0].value).toBe(300000)
  })

  test('value should return in pounds', () => {
    const result = getTotalSchemeValues(groupedEvents)
    expect(result[0].value).toBe(300000)
  })

  test('value should be equal to sum of events values when there is only one event', () => {
    groupedEvents[0].events.pop()
    groupedEvents[0].events.pop()
    const result = getTotalSchemeValues(groupedEvents)
    expect(result[0].value).toBe(100000)
  })

  test('value shold be 0 when there is a value of 0', () => {
    groupedEvents[0].events.pop()
    groupedEvents[0].events.pop()
    groupedEvents[0].events[0].data.value = 0
    const result = getTotalSchemeValues(groupedEvents)
    expect(result[0].value).toBe(0)
  })
})
