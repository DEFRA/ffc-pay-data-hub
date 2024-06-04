const Joi = require('joi')
const { FRN, CORRELATION_ID, BATCH, INVOICE_NUMBER, AGREEMENT_NUMBER, CLAIM_NUMBER } = require('../constants/categories')

module.exports = Joi.object({
  body: Joi.object({
    category: Joi.string().allow(FRN, CORRELATION_ID, BATCH, INVOICE_NUMBER, AGREEMENT_NUMBER, CLAIM_NUMBER).required(),
    value: Joi.string().required()
  }).required()
}).required()
