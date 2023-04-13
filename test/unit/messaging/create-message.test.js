const { BODY } = require('../../mocks/messaging/body')
const { TYPE } = require('../../../app/constants/type')
const { SOURCE } = require('../../../app/constants/source')
const { SESSION_ID } = require('../../mocks/messaging/session-id')

const { createMessage } = require('../../../app/messaging/create-message')

describe('create message', () => {
  test('should create message with body as body', () => {
    const message = createMessage(BODY, TYPE)
    expect(message.body).toEqual(BODY)
  })

  test('should create message with type as type', () => {
    const message = createMessage(BODY, TYPE)
    expect(message.type).toEqual(TYPE)
  })

  test('should create message with source as source', () => {
    const message = createMessage(BODY, TYPE)
    expect(message.source).toEqual(SOURCE)
  })

  test('should create message with any options set', () => {
    const options = { sessionId: SESSION_ID }
    const message = createMessage(BODY, TYPE, options)
    expect(message.sessionId).toEqual(SESSION_ID)
  })
})
