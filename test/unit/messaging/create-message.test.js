const { BODY } = require('../../mocks/messaging/body')
const { SESSION_ID } = require('../../mocks/messaging/session-id')

const { TYPE } = require('../../../app/constants/type')
const { SOURCE } = require('../../../app/constants/source')

const { createMessage } = require('../../../app/messaging/create-message')

describe('create message', () => {
  let message

  beforeEach(() => {
    message = createMessage(BODY, TYPE)
  })

  test.each([
    ['body', 'body', BODY],
    ['type', 'type', TYPE],
    ['source', 'source', SOURCE]
  ])('should create message with %s set', (_, prop, expected) => {
    expect(message[prop]).toEqual(expected)
  })

  test('should create message with any options set', () => {
    const options = { sessionId: SESSION_ID }
    const messageWithOptions = createMessage(BODY, TYPE, options)
    expect(messageWithOptions.sessionId).toEqual(SESSION_ID)
  })
})
