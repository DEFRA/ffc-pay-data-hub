const { cacheConfig } = require('../config')
const { createClient } = require('redis')
let client

const start = async () => {
  client = createClient({ socket: cacheConfig.socket, password: cacheConfig.password })
  client.on('error', (err) => console.log(`Redis error: ${err}`))
  client.on('reconnecting', () => console.log('Redis reconnecting...'))
  client.on('ready', () => console.log('Redis connected'))
  await client.connect()
}

const stop = async () => {
  await client.disconnect()
}

module.exports = {
  start,
  stop,
  client
}
