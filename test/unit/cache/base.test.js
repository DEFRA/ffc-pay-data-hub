const mockOn = jest.fn()
const mockConnect = jest.fn()
const mockDisconnect = jest.fn()
const mockClient = {
  on: mockOn,
  connect: mockConnect,
  disconnect: mockDisconnect
}
jest.mock('redis', () => {
  return {
    createClient: jest.fn().mockImplementation(() => {
      return mockClient
    })
  }
})

const mockRedis = require('redis')

const { start, stop } = require('../../../app/cache/base')

describe('cache', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should create client once on start', async () => {
    await start()
    expect(mockRedis.createClient).toHaveBeenCalledTimes(1)
  })

  test('should connect once on start', async () => {
    await start()
    expect(mockConnect).toHaveBeenCalledTimes(1)
  })

  test('should setup error listener on start', async () => {
    await start()
    expect(mockOn).toHaveBeenCalledWith('error', expect.any(Function))
  })

  test('should setup reconnecting listener on start', async () => {
    await start()
    expect(mockOn).toHaveBeenCalledWith('reconnecting', expect.any(Function))
  })

  test('should setup ready listener on start', async () => {
    await start()
    expect(mockOn).toHaveBeenCalledWith('ready', expect.any(Function))
  })

  test('should only setup three listeners on start', async () => {
    await start()
    expect(mockOn).toHaveBeenCalledTimes(3)
  })

  test('should disconnect once on stop', async () => {
    await start()
    await stop()
    expect(mockDisconnect).toHaveBeenCalledTimes(1)
  })
})
