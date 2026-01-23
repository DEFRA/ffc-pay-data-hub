jest.mock('../../app/insights', () => ({
  setup: jest.fn()
}))

jest.mock('log-timestamp', () => jest.fn())

jest.mock('../../app/storage', () => ({
  initialise: jest.fn()
}))

jest.mock('../../app/messaging', () => ({
  start: jest.fn(),
  stop: jest.fn()
}))

jest.mock('../../app/cache', () => ({
  start: jest.fn(),
  stop: jest.fn()
}))

describe('app start (messageConfig)', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  test('starts cache, initialise, and messaging when active is true', async () => {
    const { messageConfig } = require('../../app/config')
    messageConfig.active = true

    await require('../../app')

    const { start: mockStartCache } = require('../../app/cache')
    const { initialise } = require('../../app/storage')
    const { start: mockStartMessaging } = require('../../app/messaging')

    expect(mockStartCache).toHaveBeenCalledTimes(1)
    expect(initialise).toHaveBeenCalledTimes(1)
    expect(mockStartMessaging).toHaveBeenCalledTimes(1)
  })

  test('starts cache but does not initialise or start messaging when active is false', async () => {
    const { messageConfig } = require('../../app/config')
    messageConfig.active = false

    await require('../../app')

    const { start: mockStartCache } = require('../../app/cache')
    const { initialise } = require('../../app/storage')
    const { start: mockStartMessaging } = require('../../app/messaging')

    expect(mockStartCache).toHaveBeenCalledTimes(1)
    expect(initialise).not.toHaveBeenCalled()
    expect(mockStartMessaging).not.toHaveBeenCalled()
  })

  test('logs console.info when active is false', async () => {
    const { messageConfig } = require('../../app/config')
    messageConfig.active = false

    const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {})

    await require('../../app')

    expect(consoleInfoSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'Processing capabilities are currently not enabled in this environment'
      )
    )

    consoleInfoSpy.mockRestore()
  })

  test('does not log console.info when active is true', async () => {
    const { messageConfig } = require('../../app/config')
    messageConfig.active = true

    const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {})

    await require('../../app')

    expect(consoleInfoSpy).not.toHaveBeenCalled()

    consoleInfoSpy.mockRestore()
  })
})
