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

module.exports = {
  getStatus
}
