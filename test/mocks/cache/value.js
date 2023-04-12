const { REQUEST } = require('./request')
const { RESPONSE } = require('./response')

const value = {
  request: REQUEST,
  response: RESPONSE
}

module.exports = {
  VALUE: value,
  VALUE_STRING: JSON.stringify(value)
}
