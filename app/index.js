require('./insights').setup()
require('log-timestamp')
const { initialise } = require('./storage')

module.exports = (async () => {
  await initialise()
})()
