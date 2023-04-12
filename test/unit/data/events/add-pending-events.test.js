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
})
