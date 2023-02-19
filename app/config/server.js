const Joi = require('joi')

const schema = Joi.object({
  port: Joi.number().integer().default(3009),
  isDev: Joi.boolean().default(process.env.NODE_ENV === 'development')
})

const config = {
  port: process.env.PORT
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

module.exports = result.value
