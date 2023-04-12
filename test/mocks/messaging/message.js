const { SOURCE } = require('../../../app/constants/source')
const { TYPE } = require('../../../app/constants/type')
const { BODY } = require('./body')
const { SESSION_ID } = require('./session-id')

module.exports = {
  MESSAGE: {
    body: BODY,
    type: TYPE,
    source: SOURCE,
    sessionId: SESSION_ID
  }
}
