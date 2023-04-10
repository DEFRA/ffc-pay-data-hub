const { start, stop } = require('./base')
const getCachedResponse = require('./get-cached-response')
const setCachedResponse = require('./set-cached-response')

module.exports = {
  start,
  stop,
  getCachedResponse,
  setCachedResponse
}
