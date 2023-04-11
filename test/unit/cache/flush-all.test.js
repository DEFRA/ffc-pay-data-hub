const mockClient = {
  flushAll: jest.fn()
}

jest.mock('../../../app/cache/base', () => {
  return { client: mockClient }
})

const { flushAll } = require('../../../app/cache/flush-all')

describe('cache flush', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should flush all from cache once', async () => {
    await flushAll()
    expect(mockClient.flushAll).toHaveBeenCalledTimes(1)
  })
})
