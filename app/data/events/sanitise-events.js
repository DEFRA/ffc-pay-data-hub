const moment = require('moment')
const { convertToPence } = require('../../currency-convert')
const { PAYMENT_EXTRACTED } = require('../../constants/events')
const schemeNames = require('../../constants/scheme-names')

const sanitiseEvents = (events) => {
  return events.map(group => ({
    ...group,
    scheme: schemeNames[group.schemeId],
    status: getStatus(group.events),
    lastUpdated: moment(group.events[group.events.length - 1].time).format('DD/MM/YYYY HH:mm:ss'),
    events: group.events.map(event => ({
      ...event,
      data: {
        ...event.data,
        value: event.type === PAYMENT_EXTRACTED ? convertToPence(event.data.value) : event.data.value
      },
      status: getEventName(event.type)
    }))
  }))
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
  sanitiseEvents
}
