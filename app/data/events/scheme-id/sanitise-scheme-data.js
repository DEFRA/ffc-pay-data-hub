const schemeNames = require('../../../constants/scheme-names')
const { convertToPounds } = require('../../../currency')
// this makes the data easier for payweb to consume
const sanitiseSchemeData = (schemeData) => {
  return schemeData.map(scheme => ({
    scheme: schemeNames[scheme.schemeId],
    paymentRequests: scheme.paymentRequests,
    value: convertToPounds(scheme.value)
  }))
}

module.exports = {
  sanitiseSchemeData
}
