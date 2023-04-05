const {
  PAYMENT_EXTRACTED,
  PAYMENT_ENRICHED,
  PAYMENT_PAUSED_DEBT,
  PAYMENT_DEBT_ATTACHED,
  PAYMENT_PAUSED_LEDGER,
  PAYMENT_LEDGER_ASSIGNED,
  PAYMENT_PAUSED_QUALITY_CHECK,
  PAYMENT_QUALITY_CHECK_FAILED,
  PAYMENT_QUALITY_CHECK_PASSED,
  PAYMENT_RESET,
  PAYMENT_PROCESSED,
  PAYMENT_SUBMITTED,
  PAYMENT_ACKNOWLEDGED,
  PAYMENT_SETTLED
} = require('../../constants/events')

module.exports = {
  [PAYMENT_EXTRACTED]: {
    category: 'In progress',
    detail: 'Extracted from batch'
  },
  [PAYMENT_ENRICHED]: {
    default: true,
    category: 'In progress',
    detail: 'Enriched'
  },
  [PAYMENT_PAUSED_DEBT]: {
    category: 'Waiting',
    detail: 'Waiting for debt data'
  },
  [PAYMENT_DEBT_ATTACHED]: {
    category: 'In progress',
    detail: 'Debt data attached'
  },
  [PAYMENT_PAUSED_LEDGER]: {
    category: 'Waiting',
    detail: 'Ledger assignment'
  },
  [PAYMENT_LEDGER_ASSIGNED]: {
    category: 'In progress',
    detail: 'Ledger assigned'
  },
  [PAYMENT_PAUSED_QUALITY_CHECK]: {
    category: 'Waiting',
    detail: 'Ledger assignment'
  },
  [PAYMENT_QUALITY_CHECK_FAILED]: {
    category: 'Waiting',
    detail: 'Ledger correction'
  },
  [PAYMENT_QUALITY_CHECK_PASSED]: {
    category: 'In progress',
    detail: 'Ledger confirmed'
  },
  [PAYMENT_RESET]: {
    category: 'In progress',
    detail: 'Reset to be recalculated'
  },
  [PAYMENT_PROCESSED]: {
    default: true,
    category: 'In progress',
    detail: 'Final state calculated'
  },
  [PAYMENT_SUBMITTED]: {
    default: true,
    category: 'In progress',
    detail: 'Submitted to D365'
  },
  [PAYMENT_ACKNOWLEDGED]: {
    default: true,
    category: 'Completed',
    detail: 'Acknowledged by D365'
  },
  [PAYMENT_SETTLED]: {
    default: true,
    category: 'Completed',
    detail: 'Settled by D365'
  }
}
