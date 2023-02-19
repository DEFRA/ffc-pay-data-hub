const Boom = require('@hapi/boom')
const Joi = require('joi')
const { getEventsByFrn } = require('../data')

module.exports = [{
  method: 'GET',
  path: '/payments/{frn}',
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
}]
