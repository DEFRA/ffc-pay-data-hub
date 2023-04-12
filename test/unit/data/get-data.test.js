jest.mock('../../../app/data/events')
const { getEventsByFrn: mockGetEventsByFrn, getEventsByCorrelationId: mockGetEventsByCorrelationId } = require('../../../app/data/events')

const { FRN: FRN_CATEGORY } = require('../../../app/constants/categories')
const { FRN: FRN_VALUE } = require('../../mocks/frn')
const { CORRELATION_ID: CORRELATION_ID_CATEGORY } = require('../../../app/constants/categories')
const { CORRELATION_ID: CORRELATION_ID_VALUE } = require('../../mocks/correlation-id')

const { getData } = require('../../../app/data/get-data')

describe('get data', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should get FRN events for FRN category', async () => {
    await getData(FRN_CATEGORY, FRN_VALUE)
    expect(mockGetEventsByFrn).toHaveBeenCalledWith(FRN_VALUE)
  })

  test('should get correlation ID events for correlation ID category', async () => {
    await getData(CORRELATION_ID_CATEGORY, CORRELATION_ID_VALUE)
    expect(mockGetEventsByCorrelationId).toHaveBeenCalledWith(CORRELATION_ID_VALUE)
  })

  test('should throw an error for unknown category', async () => {
    await expect(getData('unknown', 'value')).rejects.toThrow('Unknown category: unknown')
  })
})
