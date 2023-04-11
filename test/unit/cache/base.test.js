jest.mock('redis')
const mockClient = {
  on: jest.fn(),
  connect: jest.fn(),
  disconnect: jest.fn()
}
const mockRedis = require('redis', () => {
  return {
    createClient: jest.fn().mockImplementation(() => {
      return mockClient
    })
  }
})

const { start, stop, client } = require('../../../app/cache/base')

describe('cache', () => {
  describe('start', () => {
    test('should create client once on start', async () => {
      await start()
      expect(mockRedis.createClient).toHaveBeenCalledTimes(1)
    })
  })

  describe('stop', () => {
    test('should disconnect once on stop', async () => {
      await stop()
      expect(client.disconnect).toHaveBeenCalledTimes(1)
    })
  })
})
