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

const { getCachedResponse } = require('../../../app/cache/get-cached-response')

describe('get cached response', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGet.mockResolvedValue(DATA)
    mockGetRequestIndex.mockReturnValue(0)
  })

  test('should get from cache with name and key', async () => {
    await getCachedResponse(NAME, REQUEST, KEY)
    expect(mockGet).toHaveBeenCalledWith(NAME, KEY)
  })

  test('should check if request already exists in cache', async () => {
    await getCachedResponse(NAME, REQUEST, KEY)
    expect(mockGetRequestIndex).toHaveBeenCalledWith(DATA, REQUEST)
  })

  test('should return cached response if exists', async () => {
    const response = await getCachedResponse(NAME, REQUEST, KEY)
    expect(response).toEqual(RESPONSE)
  })

  test('should return undefined if no cached response exists', async () => {
    mockGetRequestIndex.mockReturnValue(-1)
    const response = await getCachedResponse(NAME, REQUEST, KEY)
    expect(response).toBeUndefined()
  })

  test('should add new request to cache if does not exist', async () => {
    mockGet.mockResolvedValue({})
    await getCachedResponse(NAME, REQUEST, KEY)
    expect(mockUpdate).toHaveBeenCalledWith(NAME, KEY, { requests: [{ request: REQUEST }] })
  })
})
