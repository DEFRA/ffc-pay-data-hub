const Boom = require('@hapi/boom')
const Joi = require('joi')
const { getEventsByFrn, getEventsByCorrelationId } = require('../data')

module.exports = [{
  method: 'GET',
  path: '/payments/frn/{frn}',
  options: {
    validate: {
      params: Joi.object({
        frn: Joi.number().integer().required()
      }),
      failAction: async (_request, _h, error) => {
        return Boom.badRequest(error)
      }
    },
    handler: async (request, h) => {
      const { frn } = request.params
      const payments = await getEventsByFrn(frn)
      return h.response(payments).code(200)
    }
  }
}, {
  method: 'GET',
  path: '/payments/correlation-id/{correlationId}',
  options: {
    validate: {
      params: Joi.object({
        correlationId: Joi.string().uuid().required()
      }),
      failAction: async (_request, _h, error) => {
        return Boom.badRequest(error)
      }
    },
    handler: async (request, h) => {
      const { correlationId } = request.params
      const payments = await getEventsByCorrelationId(correlationId)
      return h.response(payments).code(200)
    }
  }
}]
