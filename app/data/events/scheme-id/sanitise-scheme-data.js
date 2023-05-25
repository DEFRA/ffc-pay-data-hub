const schemeNames = require('../../../constants/scheme-names')
const { convertToPounds } = require('../../../currency-convert')
// this makes the data easier for payweb to consume
const sanitiseSchemeData = (schemeData) => {
  return schemeData.map(scheme => ({
    ...scheme,
    scheme: schemeNames[scheme.schemeId],
    value: convertToPounds(scheme.value)
  }))
}

module.exports = {
  sanitiseSchemeData
}
