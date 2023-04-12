const { getClient } = require('./base')
const { getFullKey } = require('./get-full-key')
const { cacheConfig } = require('../config')

const set = async (cache, key, value) => {
  const fullKey = getFullKey(cache, key)
  const serializedValue = JSON.stringify(value)
  const client = getClient()
  await client.set(fullKey, serializedValue)
  await client.expire(fullKey, cacheConfig.ttl)
}

module.exports = {
  set
}
