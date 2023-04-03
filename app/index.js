require('./insights').setup()
require('log-timestamp')
const { initialise } = require('./storage')
const { start, stop } = require('./messaging')
const cache = require('./cache')

process.on(['SIGTERM', 'SIGINT'], async () => {
  await cache.stop()
  await stop()
  process.exit(0)
})

module.exports = (async () => {
  await cache.start()
  await initialise()
  await start()
})()
