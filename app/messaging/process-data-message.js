const util = require('util')
const { cacheConfig, messageConfig } = require('../config')
const { getCachedResponse, setCachedResponse } = require('../cache')
const { sendMessage } = require('./send-message')
const { getData } = require('../data')
const { getCacheKey } = require('./get-cache-key')

const processDataMessage = async (message, receiver) => {
  try {
    const { body, messageId } = message
    const { category, value } = body

    console.log('Data request received:', util.inspect(body, false, null, true))
    const key = getCacheKey(category, value)
    const cachedResponse = await getCachedResponse(cacheConfig.cache, body, key)
    const response = cachedResponse ?? { data: await getData(category, value) }

    if (!cachedResponse) {
      await setCachedResponse(cacheConfig.cache, key, body, response)
    }

    await sendMessage(response, 'uk.gov.defra.ffc.pay.data.response', messageConfig.dataQueue, { sessionId: messageId })
    await receiver.completeMessage(message)
    console.log('Data request completed:', util.inspect(response, false, null, true))
  } catch (err) {
    console.error('Unable to process data message:', err)
    await receiver.abandonMessage(message)
  }
}

module.exports = {
  processDataMessage
}
