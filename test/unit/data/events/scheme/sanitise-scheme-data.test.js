jest.mock('../../../../../app/currency')
const { convertToString } = require('../../../../../app/currency')

const schemeNames = require('../../../../../app/constants/scheme-names')
const { sanitiseSchemeData } = require('../../../../../app/data/events/scheme-id/sanitise-scheme-data')

const totalSchemeValues = require('../../../../mocks/events/total-scheme-values')

describe('get events by frn', () => {
  beforeEach(() => {

  })

  test('should map schemeId value to scheme name', async () => {
    const result = sanitiseSchemeData([totalSchemeValues])
    expect(result[0].scheme).toBe(schemeNames[1])
  })

  test('should map paymentRequests to scheme.paymentRequests', async () => {
    const result = sanitiseSchemeData([totalSchemeValues])
    expect(result[0].paymentRequests).toBe(totalSchemeValues.paymentRequests)
  })

  test('should call convertToPounds with totalSchemeValues.value', async () => {
    sanitiseSchemeData([totalSchemeValues])
    expect(convertToString).toBeCalledWith(totalSchemeValues.value)
  })
})
