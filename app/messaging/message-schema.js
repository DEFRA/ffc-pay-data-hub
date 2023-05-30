const Joi = require('joi')
const { FRN, CORRELATION_ID, BATCH } = require('../constants/categories')

module.exports = Joi.object({
  body: Joi.object({
    category: Joi.string().allow(FRN, CORRELATION_ID, BATCH).required(),
    value: Joi.string().required()
  }).required()
}).required()
