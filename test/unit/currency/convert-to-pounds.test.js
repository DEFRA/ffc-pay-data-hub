const { convertToPounds } = require('../../../app/currency/convert-to-pounds')

describe('convert to pounds', () => {
  test('converts 100 to pounds', () => {
    const result = convertToPounds(100)
    expect(result).toEqual('1.00')
  })

  test('converts 100 to pounds with no decimals', () => {
    const result = convertToPounds(100.00)
    expect(result).toEqual('1.00')
  })

  test('converts -100 to pounds', () => {
    const result = convertToPounds(-100)
    expect(result).toEqual('-1.00')
  })

  test('converts 100.10 to pounds ignoring decimal', () => {
    const result = convertToPounds(100.10)
    expect(result).toEqual('1.00')
  })

  test('converts 110 to pounds', () => {
    const result = convertToPounds(110)
    expect(result).toEqual('1.10')
  })
})
