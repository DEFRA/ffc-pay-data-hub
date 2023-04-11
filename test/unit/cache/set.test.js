const mockClient = {
  set: jest.fn(),
  expire: jest.fn()
}

jest.mock('../../../app/cache/base', () => {
  return { client: mockClient }
})

jest.mock('../../../app/cache/get-full-key')
const { getFullKey: mockGetFullKey } = require('../../../app/cache/get-full-key')

const { cacheConfig } = require('../../../app/config')
const { PREFIX } = require('../../mocks/cache/prefix')
const { NAME } = require('../../mocks/cache/name')
const { KEY } = require('../../mocks/cache/key')
const { VALUE, VALUE_STRING } = require('../../mocks/cache/value')

const { set } = require('../../../app/cache/set')

describe('cache set', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetFullKey.mockReturnValue(PREFIX)
  })

  test('should get full key from cache name and key', async () => {
    await set(NAME, KEY, VALUE)
    expect(mockGetFullKey).toHaveBeenCalledWith(NAME, KEY)
  })

  test('should set with full key from cache and value as string', async () => {
    await set(NAME, KEY, VALUE)
    expect(mockClient.set).toHaveBeenCalledWith(PREFIX, VALUE_STRING)
  })

  test('should set with expiration time from config', async () => {
    await set(NAME, KEY, VALUE)
    expect(mockClient.expire).toHaveBeenCalledWith(PREFIX, cacheConfig.ttl)
  })
})
