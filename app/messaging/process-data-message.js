const { cacheConfig, messageConfig } = require('../config')
const { getCachedResponse, setCachedResponse } = require('../cache')
const sendMessage = require('./send-message')
const util = require('util')
const { getData } = require('../data')

const processDataMessage = async (message, receiver) => {
  try {
    const { body, messageId } = message
    const { category, value } = body

    console.log('Data request received:', util.inspect(body, false, null, true))
    const key = getKey(category, value)
    const cachedResponse = await getCachedResponse(cacheConfig.cache, body, key)
    const response = cachedResponse ?? await getData(category, value)// TODO: GET DATA await calculatePaymentRates(code, landCovers, calculateDate)

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

const getKey = (category, value) => {
  return `${category}:${value}`
}

module.exports = processDataMessage
