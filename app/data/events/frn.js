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
      paymentRequestNumber: y.data.paymentRequestNumber,
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
      return getEventOrder(a.type) - getEventOrder(b.type)
    })
    return {
      ...group,
      events: sortedEvents
    }
  }).sort((a, b) => {
    return a.schemeId - b.schemeId || a.marketingYear - b.marketingYear || a.agreementNumber - b.agreementNumber || a.paymentRequestNumber - b.paymentRequestNumber
  })
}

const getEventOrder = (event) => {
  const eventOrder = {
    'uk.gov.defra.ffc.pay.payment.extracted': 1,
    'uk.gov.defra.ffc.pay.payment.enriched': 2,
    'uk.gov.defra.ffc.pay.payment.paused.debt': 3,
    'uk.gov.defra.ffc.pay.payment.debt.attached': 4,
    'uk.gov.defra.ffc.pay.payment.paused.ledger': 5,
    'uk.gov.defra.ffc.pay.payment.ledger.assigned': 6,
    'uk.gov.defra.ffc.pay.payment.ledger.quality-check.pending': 7,
    'uk.gov.defra.ffc.pay.payment.ledger.quality-check.failed': 8,
    'uk.gov.defra.ffc.pay.payment.ledger.quality-check.passed': 9,
    'uk.gov.defra.ffc.pay.payment.processed': 10,
    'uk.gov.defra.ffc.pay.payment.submitted': 11,
    'uk.gov.defra.ffc.pay.payment.acknowledged': 12,
    'uk.gov.defra.ffc.pay.payment.settled': 13
  }
  return eventOrder[event.type]
}

const sanitiseEvents = (events) => {
  return events.map(group => ({
    ...group,
    scheme: getScheme(group.schemeId),
    status: getStatus(group.events),
    lastUpdated: moment(group.events[group.events.length - 1].time).format('DD/MM/YYYY HH:mm:ss'),
    events: group.events.map(event => ({
      ...event,
      data: {
        ...event.data,
        value: event.type === 'uk.gov.defra.ffc.pay.payment.extracted' ? convertToPence(event.data.value) : event.data.value
      },
      status: getEventName(event.type)
    }))
  }))
}

const getScheme = (schemeId) => {
  const schemeMap = {
    1: 'SFI',
    2: 'SFI Pilot',
    3: 'Lump Sums',
    4: 'Vet Visits'
  }
  return schemeMap[schemeId]
}

const getStatus = (events) => {
  const eventMap = {
    'uk.gov.defra.ffc.pay.payment.extracted': {
      category: 'Waiting',
      detail: 'Waiting for enrichment'
    },
    'uk.gov.defra.ffc.pay.payment.enriched': {
      category: 'Waiting',
      detail: 'Waiting for processing'
    },
    'uk.gov.defra.ffc.pay.payment.paused.debt': {
      category: 'Waiting',
      detail: 'Waiting for debt data'
    },
    'uk.gov.defra.ffc.pay.payment.debt.attached': {
      category: 'Waiting',
      detail: 'Waiting for ledger assignment'
    },
    'uk.gov.defra.ffc.pay.payment.paused.ledger': {
      category: 'Waiting',
      detail: 'Waiting for ledger assignment'
    },
    'uk.gov.defra.ffc.pay.payment.ledger.assigned': {
      category: 'In progress',
      detail: 'Waiting for ledger quality check'
    },
    'uk.gov.defra.ffc.pay.payment.ledger.quality-check.pending': {
      category: 'Waiting',
      detail: 'Waiting for ledger quality check'
    },
    'uk.gov.defra.ffc.pay.payment.ledger.quality-check.failed': {
      category: 'Waiting',
      detail: 'Waiting for ledger correction'
    },
    'uk.gov.defra.ffc.pay.payment.ledger.quality-check.passed': {
      category: 'Waiting',
      detail: 'Waiting for final state calculation'
    },
    'uk.gov.defra.ffc.pay.payment.processed': {
      category: 'Waiting',
      detail: 'Waiting for submission to D365'
    },
    'uk.gov.defra.ffc.pay.payment.submitted': {
      category: 'Waiting',
      detail: 'Waiting for D365 load'
    },
    'uk.gov.defra.ffc.pay.payment.acknowledged': {
      category: 'Completed',
      detail: 'Acknowledged by D365'
    },
    'uk.gov.defra.ffc.pay.payment.settled': {
      category: 'Completed',
      detail: 'Settled by D365'
    }
  }
  const lastEvent = events[events.length - 1]
  return eventMap[lastEvent.type]
}

const getEventName = (type) => {
  const eventMap = {
    'uk.gov.defra.ffc.pay.payment.extracted': {
      category: 'In progress',
      detail: 'Extracted from batch'
    },
    'uk.gov.defra.ffc.pay.payment.enriched': {
      category: 'In progress',
      detail: 'Enriched'
    },
    'uk.gov.defra.ffc.pay.payment.paused.debt': {
      category: 'Waiting',
      detail: 'Waiting for debt data'
    },
    'uk.gov.defra.ffc.pay.payment.debt.attached': {
      category: 'In progress',
      detail: 'Debt data attached'
    },
    'uk.gov.defra.ffc.pay.payment.paused.ledger': {
      category: 'Waiting',
      detail: 'Ledger assignment'
    },
    'uk.gov.defra.ffc.pay.payment.ledger.assigned': {
      category: 'In progress',
      detail: 'Ledger assigned'
    },
    'uk.gov.defra.ffc.pay.payment.ledger.quality-check.pending': {
      category: 'Waiting',
      detail: 'Ledger assignment'
    },
    'uk.gov.defra.ffc.pay.payment.ledger.quality-check.failed': {
      category: 'Waiting',
      detail: 'Ledger correction'
    },
    'uk.gov.defra.ffc.pay.payment.ledger.quality-check.passed': {
      category: 'In progress',
      detail: 'Ledger confirmed'
    },
    'uk.gov.defra.ffc.pay.payment.processed': {
      category: 'In progress',
      detail: 'Final state calculated'
    },
    'uk.gov.defra.ffc.pay.payment.submitted': {
      category: 'In progress',
      detail: 'Submitted to D365'
    },
    'uk.gov.defra.ffc.pay.payment.acknowledged': {
      category: 'Completed',
      detail: 'Acknowledged by D365'
    },
    'uk.gov.defra.ffc.pay.payment.settled': {
      category: 'Completed',
      detail: 'Settled by D365'
    }
  }
  return eventMap[type]
}

module.exports = {
  getEventsByFrn
}
