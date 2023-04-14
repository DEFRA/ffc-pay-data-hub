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
} = require('./events')
const {
  PAYMENT_EXTRACTED_NAME,
  PAYMENT_ENRICHED_NAME,
  PAYMENT_PAUSED_DEBT_NAME,
  PAYMENT_DEBT_ATTACHED_NAME,
  PAYMENT_PAUSED_LEDGER_NAME,
  PAYMENT_LEDGER_ASSIGNED_NAME,
  PAYMENT_PAUSED_QUALITY_CHECK_NAME,
  PAYMENT_QUALITY_CHECK_FAILED_NAME,
  PAYMENT_QUALITY_CHECK_PASSED_NAME,
  PAYMENT_RESET_NAME,
  PAYMENT_PROCESSED_NAME,
  PAYMENT_SUBMITTED_NAME,
  PAYMENT_ACKNOWLEDGED_NAME,
  PAYMENT_SETTLED_NAME
} = require('./names')

const {
  PAYMENT_EXTRACTED_STATUS,
  PAYMENT_ENRICHED_STATUS,
  PAYMENT_PAUSED_DEBT_STATUS,
  PAYMENT_DEBT_ATTACHED_STATUS,
  PAYMENT_PAUSED_LEDGER_STATUS,
  PAYMENT_LEDGER_ASSIGNED_STATUS,
  PAYMENT_PAUSED_QUALITY_CHECK_STATUS,
  PAYMENT_QUALITY_CHECK_FAILED_STATUS,
  PAYMENT_QUALITY_CHECK_PASSED_STATUS,
  PAYMENT_RESET_STATUS,
  PAYMENT_PROCESSED_STATUS,
  PAYMENT_SUBMITTED_STATUS,
  PAYMENT_ACKNOWLEDGED_STATUS,
  PAYMENT_SETTLED_STATUS
} = require('./statuses')

const { IN_PROGRESS, WAITING, COMPLETED } = require('./states')

module.exports = {
  [PAYMENT_EXTRACTED]: {
    name: PAYMENT_EXTRACTED_NAME,
    detail: PAYMENT_EXTRACTED_STATUS,
    state: IN_PROGRESS
  },
  [PAYMENT_ENRICHED]: {
    name: PAYMENT_ENRICHED_NAME,
    state: IN_PROGRESS,
    detail: PAYMENT_ENRICHED_STATUS,
    default: true
  },
  [PAYMENT_PAUSED_DEBT]: {
    name: PAYMENT_PAUSED_DEBT_NAME,
    detail: PAYMENT_PAUSED_DEBT_STATUS,
    state: WAITING
  },
  [PAYMENT_DEBT_ATTACHED]: {
    name: PAYMENT_DEBT_ATTACHED_NAME,
    detail: PAYMENT_DEBT_ATTACHED_STATUS,
    state: IN_PROGRESS
  },
  [PAYMENT_PAUSED_LEDGER]: {
    name: PAYMENT_PAUSED_LEDGER_NAME,
    detail: PAYMENT_PAUSED_LEDGER_STATUS,
    state: WAITING
  },
  [PAYMENT_LEDGER_ASSIGNED]: {
    name: PAYMENT_LEDGER_ASSIGNED_NAME,
    detail: PAYMENT_LEDGER_ASSIGNED_STATUS,
    state: IN_PROGRESS
  },
  [PAYMENT_PAUSED_QUALITY_CHECK]: {
    name: PAYMENT_PAUSED_QUALITY_CHECK_NAME,
    detail: PAYMENT_PAUSED_QUALITY_CHECK_STATUS,
    state: WAITING
  },
  [PAYMENT_QUALITY_CHECK_FAILED]: {
    name: PAYMENT_QUALITY_CHECK_FAILED_NAME,
    detail: PAYMENT_QUALITY_CHECK_FAILED_STATUS,
    state: WAITING
  },
  [PAYMENT_QUALITY_CHECK_PASSED]: {
    name: PAYMENT_QUALITY_CHECK_PASSED_NAME,
    detail: PAYMENT_QUALITY_CHECK_PASSED_STATUS,
    state: IN_PROGRESS
  },
  [PAYMENT_RESET]: {
    name: PAYMENT_RESET_NAME,
    detail: PAYMENT_RESET_STATUS,
    state: IN_PROGRESS
  },
  [PAYMENT_PROCESSED]: {
    name: PAYMENT_PROCESSED_NAME,
    detail: PAYMENT_PROCESSED_STATUS,
    state: IN_PROGRESS,
    default: true
  },
  [PAYMENT_SUBMITTED]: {
    name: PAYMENT_SUBMITTED_NAME,
    detail: PAYMENT_SUBMITTED_STATUS,
    state: IN_PROGRESS,
    default: true
  },
  [PAYMENT_ACKNOWLEDGED]: {
    name: PAYMENT_ACKNOWLEDGED_NAME,
    detail: PAYMENT_ACKNOWLEDGED_STATUS,
    state: COMPLETED,
    default: true
  },
  [PAYMENT_SETTLED]: {
    name: PAYMENT_SETTLED_NAME,
    detail: PAYMENT_SETTLED_STATUS,
    state: COMPLETED
  }
}
