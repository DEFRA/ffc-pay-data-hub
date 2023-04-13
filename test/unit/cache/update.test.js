jest.mock('../../../app/cache/get')
const { get: mockGet } = require('../../../app/cache/get')

jest.mock('../../../app/cache/set')
const { set: mockSet } = require('../../../app/cache/set')

const { NAME } = require('../../mocks/cache/name')
const { KEY } = require('../../mocks/cache/key')
const { VALUE } = require('../../mocks/cache/value')

const { update } = require('../../../app/cache/update')

describe('cache set', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGet.mockResolvedValue({})
  })

  test('should get existing item', async () => {
    await update(NAME, KEY, VALUE)
    expect(mockGet).toHaveBeenCalledWith(NAME, KEY)
  })

  test('should set value as is if no value exists', async () => {
    await update(NAME, KEY, VALUE)
    expect(mockSet).toHaveBeenCalledWith(NAME, KEY, VALUE)
  })

  test('should merge existing item with new value', async () => {
    const existing = { a: 1, b: 2 }
    mockGet.mockResolvedValue(existing)
    await update(NAME, KEY, VALUE)
    expect(mockSet).toHaveBeenCalledWith(NAME, KEY, { ...existing, ...VALUE })
  })

  test('should not merge arrays', async () => {
    const existing = { a: [1, 2, 3] }
    mockGet.mockResolvedValue(existing)
    await update(NAME, KEY, { a: [4, 5, 6] })
    expect(mockSet).toHaveBeenCalledWith(NAME, KEY, { a: [4, 5, 6] })
  })
})
