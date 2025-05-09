const { DefaultAzureCredential } = require('@azure/identity')
const { TableClient, odata } = require('@azure/data-tables')
const { BlobServiceClient } = require('@azure/storage-blob')
const { storageConfig } = require('./config')
const { PAYMENT_EVENT, HOLD_EVENT, WARNING_EVENT, BATCH_EVENT } = require('./constants/event-types')

let paymentClient
let holdClient
let warningClient
let batchClient
let blobServiceClient
let container
let dataRequestContainer

const initialise = async () => {
  if (storageConfig.useConnectionString) {
    console.log('Using connection string for Table & Storage Clients')
    paymentClient = TableClient.fromConnectionString(storageConfig.connectionString, storageConfig.paymentTable, { allowInsecureConnection: true })
    holdClient = TableClient.fromConnectionString(storageConfig.connectionString, storageConfig.holdTable, { allowInsecureConnection: true })
    warningClient = TableClient.fromConnectionString(storageConfig.connectionString, storageConfig.warningTable, { allowInsecureConnection: true })
    batchClient = TableClient.fromConnectionString(storageConfig.connectionString, storageConfig.batchTable, { allowInsecureConnection: true })
    blobServiceClient = BlobServiceClient.fromConnectionString(storageConfig.connectionString)
  } else {
    console.log('Using DefaultAzureCredential for Table & Storage Clients')
    paymentClient = new TableClient(`https://${storageConfig.account}.table.core.windows.net`, storageConfig.paymentTable, new DefaultAzureCredential({ managedIdentityClientId: storageConfig.managedIdentityClientId }))
    holdClient = new TableClient(`https://${storageConfig.account}.table.core.windows.net`, storageConfig.holdTable, new DefaultAzureCredential({ managedIdentityClientId: storageConfig.managedIdentityClientId }))
    warningClient = new TableClient(`https://${storageConfig.account}.table.core.windows.net`, storageConfig.warningTable, new DefaultAzureCredential({ managedIdentityClientId: storageConfig.managedIdentityClientId }))
    batchClient = new TableClient(`https://${storageConfig.account}.table.core.windows.net`, storageConfig.batchTable, new DefaultAzureCredential({ managedIdentityClientId: storageConfig.managedIdentityClientId }))
    blobServiceClient = new BlobServiceClient(`https://${storageConfig.account}.blob.core.windows.net`, new DefaultAzureCredential({ managedIdentityClientId: storageConfig.managedIdentityClientId }))
  }
  container = blobServiceClient.getContainerClient(storageConfig.container)
  dataRequestContainer = blobServiceClient.getContainerClient(storageConfig.dataRequestContainer)
  if (storageConfig.createEntities) {
    console.log('Making sure tables exist')
    await paymentClient.createTable(storageConfig.paymentTable)
    await holdClient.createTable(storageConfig.holdTable)
    await warningClient.createTable(storageConfig.warningTable)
    await batchClient.createTable(storageConfig.batchTable)
    console.log('Making sure blob containers exist')
    await container.createIfNotExists()
    await dataRequestContainer.createIfNotExists()
    console.log('Storage ready')
  }
}

const getClient = (eventType) => {
  switch (eventType) {
    case PAYMENT_EVENT:
      return paymentClient
    case HOLD_EVENT:
      return holdClient
    case WARNING_EVENT:
      return warningClient
    case BATCH_EVENT:
      return batchClient
    default:
      throw new Error(`Unknown event type: ${eventType}`)
  }
}

const writeFile = async (filename, content) => {
  const blob = container.getBlockBlobClient(filename)
  await blob.upload(content, content.length)
}

const writeDataRequestFile = async (filename, content) => {
  const blob = dataRequestContainer.getBlockBlobClient(filename)
  await blob.upload(content, content.length)
  return blob
}

module.exports = {
  initialise,
  getClient,
  writeFile,
  writeDataRequestFile,
  odata
}
