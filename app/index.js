require('./insights').setup()
require('log-timestamp')

const { processingConfig } = require('./config')
const { initialise } = require('./storage')
const { start: startMessaging, stop: stopMessaging } = require('./messaging')
const { start: startCache, stop: stopCache } = require('./cache')

process.on(['SIGTERM', 'SIGINT'], async () => {
  await stopCache()
  await stopMessaging()
  process.exit(0)
})

module.exports = (async () => {
  await startCache()
  
  if (processingConfig.active) {
    await initialise()
    await startMessaging()
   } else {
    console.info('Processing capabilities are currently not enabled in this environment')
  }
})()
