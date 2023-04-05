const addPendingEvents = (events) => {
  events.forEach(group => {
    const pendingEvents = Object.entries(eventMap).map((event) => ({ type: event[0], ...event[1] })).filter(event => event.default && !events.some(e => e.events.some(e => e.type === event.type)))
    group.events = group.events.concat(pendingEvents.map(event => ({
      status: getEvent(event.type)
    })))
  })
  return events
}

const eventMap = {
  'uk.gov.defra.ffc.pay.payment.extracted': {
    category: 'In progress',
    detail: 'Extracted from batch'
  },
  'uk.gov.defra.ffc.pay.payment.enriched': {
    default: true,
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
    default: true,
    category: 'In progress',
    detail: 'Final state calculated'
  },
  'uk.gov.defra.ffc.pay.payment.submitted': {
    default: true,
    category: 'In progress',
    detail: 'Submitted to D365'
  },
  'uk.gov.defra.ffc.pay.payment.acknowledged': {
    default: true,
    category: 'Completed',
    detail: 'Acknowledged by D365'
  },
  'uk.gov.defra.ffc.pay.payment.settled': {
    default: true,
    category: 'Completed',
    detail: 'Settled by D365'
  }
}

const getEvent = (type) => {
  return eventMap[type]
}

module.exports = {
  addPendingEvents
}
