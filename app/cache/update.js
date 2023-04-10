const hoek = require('hoek')
const { get, set } = require('./base')

const update = async (cache, key, cacheData) => {
  const existing = await get(cache, key)
  hoek.merge(existing, cacheData, { mergeArrays: false })
  await set(cache, key, existing)
}

module.exports = {
  update
}
