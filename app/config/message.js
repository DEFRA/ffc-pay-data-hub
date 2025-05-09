const Joi = require('joi')
const { PRODUCTION } = require('../constants/environments')

const schema = Joi.object({
  messageQueue: {
    host: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
    useCredentialChain: Joi.bool().default(false),
    appInsights: Joi.object()
  },
  dataSubscription: {
    address: Joi.string(),
    topic: Joi.string(),
    type: Joi.string().default('subscription')
  },
  dataQueue: {
    address: Joi.string()
  },
  managedIdentityClientId: Joi.string().optional()
})

const config = {
  messageQueue: {
    host: process.env.MESSAGE_QUEUE_HOST,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD,
    useCredentialChain: process.env.NODE_ENV === PRODUCTION,
    appInsights: process.env.NODE_ENV === PRODUCTION ? require('applicationinsights') : undefined
  },
  dataSubscription: {
    address: process.env.DATA_SUBSCRIPTION_ADDRESS,
    topic: process.env.DATA_TOPIC_ADDRESS,
    type: 'subscription'
  },
  dataQueue: {
    address: process.env.DATARESPONSE_QUEUE_ADDRESS
  },
  managedIdentityClientId: process.env.AZURE_CLIENT_ID
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The message config is invalid. ${result.error.message}`)
}

const dataSubscription = { ...result.value.messageQueue, ...result.value.dataSubscription }
const dataQueue = { ...result.value.messageQueue, ...result.value.dataQueue }

module.exports = {
  dataSubscription,
  dataQueue
}
