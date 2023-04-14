const { messageConfig } = require('../config')
const { processDataMessage } = require('./process-data-message')
const { MessageReceiver } = require('ffc-messaging')
let dataReceiver

const start = async () => {
  const calculateAction = message => processDataMessage(message, dataReceiver)
  dataReceiver = new MessageReceiver(messageConfig.dataSubscription, calculateAction)
  await dataReceiver.subscribe()
  console.info('Ready to receive messages')
}

const stop = async () => {
  await dataReceiver.closeConnection()
}

module.exports = { start, stop }
