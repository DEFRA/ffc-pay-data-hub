const { convertToString } = require('../../../app/currency/convert-to-string')

describe('convert to string', () => {
  test('converts 100 to string', () => {
    const result = convertToString(100)
    expect(result).toEqual('£1.00')
  })

  test('converts 110 to string', () => {
    const result = convertToString(110)
    expect(result).toEqual('£1.10')
  })

  test('converts -100 to string', () => {
    const result = convertToString(-100)
    expect(result).toEqual('£-1.00')
  })

  test('converts 100.10 to string with no decimals', () => {
    const result = convertToString(100.10)
    expect(result).toEqual('£1.00')
  })

  test('converts 110.10 to string with no decimals', () => {
    const result = convertToString(110.10)
    expect(result).toEqual('£1.10')
  })

  test('converts value to string with commas if over 1000', () => {
    const result = convertToString(100000)
    expect(result).toEqual('£1,000.00')
  })

  test('converts value to string with commas if over 10000', () => {
    const result = convertToString(1000000)
    expect(result).toEqual('£10,000.00')
  })

  test('converts value to string with commas if over 100000', () => {
    const result = convertToString(10000000)
    expect(result).toEqual('£100,000.00')
  })

  test('converts value to string with commas if over 1000000', () => {
    const result = convertToString(100000000)
    expect(result).toEqual('£1,000,000.00')
  })
})
