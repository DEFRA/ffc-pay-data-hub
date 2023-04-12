jest.mock('../../../app/messaging/validate-message')
const { validateMessage: mockValidateMessage } = require('../../../app/messaging/validate-message')

jest.mock('../../../app/cache')
const { getCachedResponse: mockGetCachedResponse, setCachedResponse: mockSetCachedResponse, getCacheKey: mockGetCacheKey } = require('../../../app/cache')

jest.mock('../../../app/messaging/send-message')
const { sendMessage: mockSendMessage } = require('../../../app/messaging/send-message')

jest.mock('../../../app/data')
const { getData: mockGetData } = require('../../../app/data')

const { cacheConfig, messageConfig } = require('../../../app/config')
const { REQUEST_MESSAGE } = require('../../mocks/messaging/message')
const { CATEGORY } = require('../../mocks/cache/category')
const { REQUEST_VALUE } = require('../../mocks/cache/request-value')
const { REQUEST } = require('../../mocks/request')
const { RESPONSE } = require('../../mocks/cache/response')
const { KEY } = require('../../mocks/cache/key')
const { TYPE } = require('../../../app/constants/type')
const { VALIDATION } = require('../../../app/constants/errors')

const { processDataMessage } = require('../../../app/messaging/process-data-message')

let receiver

describe('process data message', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetCacheKey.mockReturnValue(KEY)
    mockGetCachedResponse.mockResolvedValue(RESPONSE)
    receiver = {
      completeMessage: jest.fn(),
      abandonMessage: jest.fn(),
      deadLetterMessage: jest.fn()
    }
  })

  test('should validate message', async () => {
    await processDataMessage(REQUEST_MESSAGE, receiver)
    expect(mockValidateMessage).toHaveBeenCalledWith(REQUEST_MESSAGE)
  })

  test('should get cache key from message category and value', async () => {
    await processDataMessage(REQUEST_MESSAGE, receiver)
    expect(mockGetCacheKey).toHaveBeenCalledWith(CATEGORY, REQUEST_VALUE)
  })

  test('should get cached response for request', async () => {
    await processDataMessage(REQUEST_MESSAGE, receiver)
    expect(mockGetCachedResponse).toHaveBeenCalledWith(cacheConfig.cache, REQUEST, KEY)
  })

  test('should get data for request if no cached response', async () => {
    mockGetCachedResponse.mockResolvedValue(null)
    await processDataMessage(REQUEST_MESSAGE, receiver)
    expect(mockGetData).toHaveBeenCalledWith(CATEGORY, REQUEST_VALUE)
  })

  test('should set cached response for request if no cached response', async () => {
    mockGetCachedResponse.mockResolvedValue(null)
    await processDataMessage(REQUEST_MESSAGE, receiver)
    expect(mockSetCachedResponse).toHaveBeenCalledWith(cacheConfig.cache, KEY, REQUEST, RESPONSE)
  })

  test('should send response message', async () => {
    await processDataMessage(REQUEST_MESSAGE, receiver)
    expect(mockSendMessage).toHaveBeenCalledWith(RESPONSE, TYPE, messageConfig.dataQueue, { sessionId: REQUEST_MESSAGE.messageId })
  })

  test('should complete message if message successfully processed', async () => {
    await processDataMessage(REQUEST_MESSAGE, receiver)
    expect(receiver.completeMessage).toHaveBeenCalledWith(REQUEST_MESSAGE)
  })

  test('should abandon message if message processing fails and not validation error', async () => {
    mockGetCachedResponse.mockRejectedValue(new Error('Unable to get cached response'))
    await processDataMessage(REQUEST_MESSAGE, receiver)
    expect(receiver.abandonMessage).toHaveBeenCalledWith(REQUEST_MESSAGE)
  })

  test('should dead letter message if message processing fails and validation error', async () => {
    mockValidateMessage.mockImplementation(() => {
      const error = new Error('Validation error')
      error.category = VALIDATION
      throw error
    })
    await processDataMessage(REQUEST_MESSAGE, receiver)
    expect(receiver.deadLetterMessage).toHaveBeenCalledWith(REQUEST_MESSAGE)
  })
})
