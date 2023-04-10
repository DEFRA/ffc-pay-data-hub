const { client } = require('./base')
const { getFullKey } = require('./get-full-key')

const clear = async (cache, key) => {
  const fullKey = getFullKey(cache, key)
  await client.del(fullKey)
}

module.exports = {
  clear
}
