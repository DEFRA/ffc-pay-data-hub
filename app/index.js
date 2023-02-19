require('./insights').setup()
require('log-timestamp')
const { initialise } = require('./storage')
const { createServer } = require('./server')
let server

process.on(['SIGTERM', 'SIGINT', 'SIGKILL'], async () => {
  await server.stop()
  process.exit(0)
})

module.exports = (async () => {
  await initialise()
  server = await createServer()
})()
