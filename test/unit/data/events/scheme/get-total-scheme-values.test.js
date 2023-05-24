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

  test('should return an array with two elements when groupedEvents has a length of two', async () => {
    const result = getTotalSchemeValues(groupedEvents)
    expect(result.length).toBe(2)
  })

  test('should return array of objects with schemeId, totalPaymentRequestsand totalValue', async () => {
    const result = getTotalSchemeValues(groupedEvents)
    expect(result[0]).toStrictEqual({
      schemeId: '5',
      totalPaymentRequests: 3,
      totalValue: 300000
    })
  })

  test('total paymentRequests should equal number of events in each groupedEvent ', async () => {
    const result = getTotalSchemeValues(groupedEvents)
    expect(result[0].totalPaymentRequests).toBe(groupedEvents[0].events.length)
  })

  test('schemeId should be equal to groupedEvents schemeId ', async () => {
    const result = getTotalSchemeValues(groupedEvents)
    expect(result[0].schemeId).toBe(groupedEvents[0].schemeId)
  })

  test('totalValue should be equal to sum of events values when there are 3 events', async () => {
    const result = getTotalSchemeValues(groupedEvents)
    expect(result[0].totalValue).toBe(300000)
  })

  test('totalValue should be equal to sum of events values when there is only one events', async () => {
    groupedEvents[0].events.pop()
    groupedEvents[0].events.pop()
    const result = getTotalSchemeValues(groupedEvents)
    expect(result[0].totalValue).toBe(100000)
  })

  test('totalValue shold be 0 when there is a value of 0', async () => {
    groupedEvents[0].events.pop()
    groupedEvents[0].events.pop()
    groupedEvents[0].events[0].data.value = 0
    const result = getTotalSchemeValues(groupedEvents)
    expect(result[0].totalValue).toBe(0)
  })
})
