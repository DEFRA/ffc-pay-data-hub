jest.mock('../../../app/cache/get')
const { get: mockGet } = require('../../../app/cache/get')

jest.mock('../../../app/cache/update')
const { update: mockUpdate } = require('../../../app/cache/update')

jest.mock('../../../app/cache/get-request-index')
const { getRequestIndex: mockGetRequestIndex } = require('../../../app/cache/get-request-index')

const { NAME } = require('../../mocks/cache/name')
const { KEY } = require('../../mocks/cache/key')
const { DATA } = require('../../mocks/cache/data')
const { REQUEST } = require('../../mocks/request')
const { RESPONSE } = require('../../mocks/values/response')

const { setCachedResponse } = require('../../../app/cache/set-cached-response')

describe('set cached response', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGet.mockResolvedValue(DATA)
    mockGetRequestIndex.mockReturnValue(0)
  })

  test('should get existing item from cache name and key', async () => {
    await setCachedResponse(NAME, KEY, REQUEST, RESPONSE)
    expect(mockGet).toHaveBeenCalledWith(NAME, KEY)
  })

  test('should check if request already exists in cache', async () => {
    await setCachedResponse(NAME, KEY, REQUEST, RESPONSE)
    expect(mockGetRequestIndex).toHaveBeenCalledWith(DATA, REQUEST)
  })

  test('should update existing request in cache if already exists', async () => {
    await setCachedResponse(NAME, KEY, REQUEST, RESPONSE)
    expect(mockUpdate).toHaveBeenCalledWith(NAME, KEY, DATA)
  })

  test('should add new request to cache if does not exist', async () => {
    mockGetRequestIndex.mockReturnValue(-1)
    await setCachedResponse(NAME, KEY, REQUEST, RESPONSE)
    expect(mockUpdate).toHaveBeenCalledWith(NAME, KEY, DATA)
  })
})
