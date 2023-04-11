const mockClient = {
  del: jest.fn()
}

jest.mock('../../../app/cache/base', () => {
  return { client: mockClient }
})

jest.mock('../../../app/cache/get-full-key')
const { getFullKey: mockGetFullKey } = require('../../../app/cache/get-full-key')

const { PREFIX } = require('../../mocks/cache/prefix')
const { NAME } = require('../../mocks/cache/name')
const { KEY } = require('../../mocks/cache/key')

const { clear } = require('../../../app/cache/clear')

describe('cache clear', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetFullKey.mockReturnValue(PREFIX)
  })

  test('should get full key from cache name and key', async () => {
    await clear(NAME, KEY)
    expect(mockGetFullKey).toHaveBeenCalledWith(NAME, KEY)
  })

  test('should delete full key from cache', async () => {
    await clear(NAME, KEY)
    expect(mockClient.del).toHaveBeenCalledWith(PREFIX)
  })
})
