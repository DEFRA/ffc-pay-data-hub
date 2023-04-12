const Joi = require('joi')

module.exports = Joi.object({
  body: Joi.object({
    category: Joi.string().required(),
    value: Joi.string().required()
  }).required()
}).required()
