const { getClient } = require('./base')
const { getFullKey } = require('./get-full-key')

const get = async (cache, key) => {
  const fullKey = getFullKey(cache, key)
  const client = getClient()
  const value = await client.get(fullKey)
  return value ? JSON.parse(value) : {}
}

module.exports = {
  get
}
