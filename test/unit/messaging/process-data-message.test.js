jest.mock('../../../app/cache')
const { getCachedResponse: mockGetCachedResponse, setCachedResponse: mockSetCachedResponse, getCacheKey: mockGetCacheKey } = require('../../../app/cache')

jest.mock('../../../app/messaging/send-message')
const { sendMessage: mockSendMessage } = require('../../../app/messaging/send-message')

jest.mock('../../../app/data')
const { getData: mockGetData } = require('../../../app/data')

const { REQUEST_MESSAGE } = require('../../mocks/messaging/message')
const { CATEGORY } = require('../../mocks/cache/category')
const { REQUEST } = require('../../mocks/request')

const { processDataMessage } = require('../../../app/messaging/process-data-message')

let receiver

describe('process data message', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    receiver = {
      completeMessage: jest.fn(),
      abandonMessage: jest.fn()
    }
  })

  test('should get cache key from message body', async () => {
    await processDataMessage(REQUEST_MESSAGE, receiver)
    expect(mockGetCacheKey).toHaveBeenCalledWith(CATEGORY, REQUEST)
  })
})
