const { DATA } = require('../../mocks/cache/data')
const { VALUE } = require('../../mocks/cache/value')

const { getRequestIndex } = require('../../../app/cache/get-request-index')

describe('get request index', () => {
  test('returns index of request', () => {
    expect(getRequestIndex(DATA, VALUE.request)).toBe(0)
  })

  test('returns -1 if request not found', () => {
    expect(getRequestIndex(DATA, { a: 1 })).toBe(-1)
  })
})
