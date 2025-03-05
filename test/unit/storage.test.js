const { DefaultAzureCredential } = require('@azure/identity')
const { TableClient } = require('@azure/data-tables')
const { BlobServiceClient } = require('@azure/storage-blob')
const { storageConfig } = require('../../app/config')
const { PAYMENT_EVENT, HOLD_EVENT, WARNING_EVENT, BATCH_EVENT } = require('../../app/constants/event-types')

jest.mock('@azure/identity')
jest.mock('@azure/data-tables')
jest.mock('@azure/storage-blob')

const {
  initialise,
  getClient,
  writeDataRequestFile
} = require('../../app/storage')

describe('storage', () => {
  let mockBlobServiceClient
  let mockContainerClient
  let mockDataRequestContainerClient
  let mockTableClient

  beforeEach(() => {
    jest.clearAllMocks()

    mockBlobServiceClient = {
      getContainerClient: jest.fn().mockReturnValue({
        createIfNotExists: jest.fn(),
        getBlockBlobClient: jest.fn().mockReturnValue({
          upload: jest.fn()
        })
      })
    }

    mockTableClient = {
      createTable: jest.fn()
    }

    TableClient.fromConnectionString.mockReturnValue(mockTableClient)
    TableClient.mockImplementation(() => mockTableClient)
    BlobServiceClient.fromConnectionString.mockReturnValue(mockBlobServiceClient)
    BlobServiceClient.mockImplementation(() => mockBlobServiceClient)

    mockContainerClient = mockBlobServiceClient.getContainerClient()
    mockDataRequestContainerClient = mockBlobServiceClient.getContainerClient()
  })

  describe('initialise', () => {
    test('should initialise clients using connection string', async () => {
      storageConfig.useConnectionString = true
      await initialise()
      expect(TableClient.fromConnectionString).toHaveBeenCalledTimes(4)
      expect(BlobServiceClient.fromConnectionString).toHaveBeenCalledWith(storageConfig.connectionString)
      expect(mockContainerClient.createIfNotExists).toHaveBeenCalled()
      expect(mockDataRequestContainerClient.createIfNotExists).toHaveBeenCalled()
      expect(mockTableClient.createTable).toHaveBeenCalledTimes(4)
    })

    test('should initialise clients using DefaultAzureCredential', async () => {
      storageConfig.useConnectionString = false
      await initialise()
      expect(TableClient).toHaveBeenCalledTimes(4)
      expect(BlobServiceClient).toHaveBeenCalledWith(`https://${storageConfig.storageAccount}.blob.core.windows.net`, expect.any(DefaultAzureCredential))
      expect(mockContainerClient.createIfNotExists).toHaveBeenCalled()
      expect(mockDataRequestContainerClient.createIfNotExists).toHaveBeenCalled()
      expect(mockTableClient.createTable).toHaveBeenCalledTimes(4)
    })
  })

  describe('getClient', () => {
    test('should return payment client for PAYMENT_EVENT', () => {
      const client = getClient(PAYMENT_EVENT)
      expect(client).toBeDefined()
    })

    test('should return hold client for HOLD_EVENT', () => {
      const client = getClient(HOLD_EVENT)
      expect(client).toBeDefined()
    })

    test('should return warning client for WARNING_EVENT', () => {
      const client = getClient(WARNING_EVENT)
      expect(client).toBeDefined()
    })

    test('should return batch client for BATCH_EVENT', () => {
      const client = getClient(BATCH_EVENT)
      expect(client).toBeDefined()
    })

    test('should throw error for unknown event type', () => {
      expect(() => getClient('UNKNOWN_EVENT')).toThrow('Unknown event type: UNKNOWN_EVENT')
    })
  })

  describe('writeDataRequestFile', () => {
    test('should write data request file to blob storage and return blob client', async () => {
      const filename = 'datarequest.json'
      const content = JSON.stringify({ data: 'test data' })
      const blobClient = await writeDataRequestFile(filename, content)
      expect(blobClient.upload).toHaveBeenCalledWith(content, content.length)
      expect(blobClient).toBeDefined()
    })
  })
})
