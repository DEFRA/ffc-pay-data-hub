const moment = require('moment')
const { PAYMENT_EVENT } = require('../../constants/event-types')
const { convertToPence } = require('../../currency-convert')
const { getClient, odata } = require('../../storage')

const getEventsByFrn = async (frn) => {
  const events = await getEvents(frn)
  const groupedEvents = groupEventsByFrn(events)
  const orderedEvents = orderGroupedEvents(groupedEvents)
  return sanitiseEvents(orderedEvents)
}

const getEvents = async (frn) => {
  const client = getClient(PAYMENT_EVENT)
  const eventResults = client.listEntities({ queryOptions: { filter: odata`PartitionKey eq ${frn.toString()} and category eq 'frn'` } })
  const events = []
  for await (const event of eventResults) {
    event.data = JSON.parse(event.data)
    events.push(event)
  }
  return events
}

const groupEventsByFrn = (events) => {
  return [...events.reduce((x, y) => {
    const correlationId = y.rowKey.split('|')[0]
    const key = `${y.partitionKey}-${correlationId}`

    // if key doesn't exist then first instance so create new group
    const item = x.get(key) || Object.assign({}, {
      frn: y.partitionKey,
      correlationId,
      schemeId: y.data.schemeId,
      agreementNumber: y.data.agreementNumber,
      marketingYear: y.data.marketingYear,
      events: []
    })
    item.events.push(y)

    return x.set(key, item)
  }, new Map()).values()]
}

const orderGroupedEvents = (events) => {
  return events.map(group => {
    const sortedEvents = group.events.sort((a, b) => {
      return new Date(a.time) - new Date(b.time)
    })
    return {
      ...group,
      events: sortedEvents
    }
  })
}

const sanitiseEvents = (events) => {
  return events.map(group => ({
    ...group,
    status: getStatus(group.events),
    lastUpdated: moment(group.events[group.events.length - 1].time).format('DD/MM/YYYY'),
    events: group.events.map(event => ({
      ...event,
      value: event.type === 'uk.gov.defra.ffc.pay.payment.extracted' ? convertToPence(event.data.value) : event.data.value,
      name: getEventName(event.type)
    }))
  }))
}

const getStatus = (events) => {
  const eventMap = {
    'uk.gov.defra.ffc.pay.payment.extracted': 'Batch received',
    'uk.gov.defra.ffc.pay.payment.enriched': 'Request enriched for downstream processing',
    'uk.gov.defra.ffc.pay.payment.paused.debt': 'Waiting for debt data',
    'uk.gov.defra.ffc.pay.payment.debt.attached': 'Debt data attached',
    'uk.gov.defra.ffc.pay.payment.paused.ledger': 'Waiting for ledger assignment',
    'uk.gov.defra.ffc.pay.payment.ledger.assigned': 'Ledger assigned',
    'uk.gov.defra.ffc.pay.payment.ledger.quality-check.pending': 'Waiting for ledger quality check',
    'uk.gov.defra.ffc.pay.payment.ledger.quality-check.failed': 'Ledger quality check failed, waiting for correction',
    'uk.gov.defra.ffc.pay.payment.ledger.quality-check.passed': 'Ledger quality check passed',
    'uk.gov.defra.ffc.pay.payment.processed': 'Final payment request state calculated',
    'uk.gov.defra.ffc.pay.payment.submitted': 'Submitted to D365',
    'uk.gov.defra.ffc.pay.payment.acknowledged': 'Acknowledged by D365',
    'uk.gov.defra.ffc.pay.payment.settled': 'Settled by D365'
  }
  const lastEvent = events[events.length - 1]
  return eventMap[lastEvent.type]
}

const getEventName = (type) => {
  const eventMap = {
    'uk.gov.defra.ffc.pay.payment.extracted': 'Batch received',
    'uk.gov.defra.ffc.pay.payment.enriched': 'Request enriched for downstream processing',
    'uk.gov.defra.ffc.pay.payment.paused.debt': 'Waiting for debt data',
    'uk.gov.defra.ffc.pay.payment.debt.attached': 'Debt data attached',
    'uk.gov.defra.ffc.pay.payment.paused.ledger': 'Waiting for ledger assignment',
    'uk.gov.defra.ffc.pay.payment.ledger.assigned': 'Ledger assigned',
    'uk.gov.defra.ffc.pay.payment.ledger.quality-check.pending': 'Waiting for ledger quality check',
    'uk.gov.defra.ffc.pay.payment.ledger.quality-check.failed': 'Ledger quality check failed, waiting for correction',
    'uk.gov.defra.ffc.pay.payment.ledger.quality-check.passed': 'Ledger quality check passed',
    'uk.gov.defra.ffc.pay.payment.processed': 'Final payment request state calculated',
    'uk.gov.defra.ffc.pay.payment.submitted': 'Submitted to D365',
    'uk.gov.defra.ffc.pay.payment.acknowledged': 'Acknowledged by D365',
    'uk.gov.defra.ffc.pay.payment.settled': 'Settled by D365'
  }
  return eventMap[type]
}

module.exports = {
  getEventsByFrn
}
