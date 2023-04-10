const { client } = require('./base')

const flushAll = async () => {
  await client.flushAll()
}

module.exports = {
  flushAll
}
