jest.mock('../../../app/data/events')
const { getEventsByFrn: mockGetEventsByFrn, getEventsByCorrelationId: mockGetEventsByCorrelationId, getEventsByBatch: mockGetEventsByBatch, getEventsByScheme: mockgetEventsByScheme, getFilteredEventsForCategory: mockGetIrregularEvents } = require('../../../app/data/events')

const { FRN: FRN_VALUE } = require('../../mocks/values/frn')
const { CORRELATION_ID: CORRELATION_ID_VALUE } = require('../../mocks/values/correlation-id')
const { BATCH: BATCH_VALUE } = require('../../mocks/values/batch')
const { SCHEME_ID } = require('../../mocks/values/scheme-id')

const { FRN: FRN_CATEGORY, CORRELATION_ID: CORRELATION_ID_CATEGORY, BATCH: BATCH_CATEGORY, SCHEME_ID: SCHEME_ID_CATEGORY, INVOICE_NUMBER: INVOICE_NUMBER_CATEGORY, CLAIM_NUMBER: CLAIM_NUMBER_CATEGORY, AGREEMENT_NUMBER: AGREEMENT_NUMBER_CATEGORY } = require('../../../app/constants/categories')

const { getData } = require('../../../app/data/get-data')
const { INVOICE_NUMBER } = require('../../mocks/values/invoice-number')
const { CONTRACT_NUMBER } = require('../../mocks/values/contract-number')
const { AGREEMENT_NUMBER } = require('../../mocks/values/agreement-number')

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

  test('should get batch events for batch category', async () => {
    await getData(BATCH_CATEGORY, BATCH_VALUE)
    expect(mockGetEventsByBatch).toHaveBeenCalledWith(BATCH_VALUE)
  })

  test('should get scheme events for schemeId category', async () => {
    await getData(SCHEME_ID_CATEGORY, SCHEME_ID)
    expect(mockgetEventsByScheme).toHaveBeenCalledWith()
  })

  test('should get irregular events for agreement number category', async () => {
    await getData(AGREEMENT_NUMBER_CATEGORY, AGREEMENT_NUMBER)
    expect(mockGetIrregularEvents).toHaveBeenCalledWith(AGREEMENT_NUMBER_CATEGORY, AGREEMENT_NUMBER)
  })

  test('should get irregular events for claim number category', async () => {
    await getData(CLAIM_NUMBER_CATEGORY, CONTRACT_NUMBER)
    expect(mockGetIrregularEvents).toHaveBeenCalledWith(CLAIM_NUMBER_CATEGORY, CONTRACT_NUMBER)
  })

  test('should get irregular events for invoice number category', async () => {
    await getData(INVOICE_NUMBER_CATEGORY, INVOICE_NUMBER)
    expect(mockGetIrregularEvents).toHaveBeenCalledWith(INVOICE_NUMBER_CATEGORY, INVOICE_NUMBER)
  })

  test('should throw an error for unknown category', async () => {
    await expect(getData('unknown', 'value')).rejects.toThrow('Unknown category: unknown')
  })
})
