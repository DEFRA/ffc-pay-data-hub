const {
  SFI,
  SFI_PILOT,
  LUMP_SUMS,
  VET_VISITS,
  CS,
  BPS,
  FDMR,
  MANUAL,
  ES,
  FC,
  IMPS,
  SFI23,
  DELINKED
} = require('./schemes')

module.exports = {
  [SFI]: 'SFI',
  [SFI_PILOT]: 'SFI Pilot',
  [LUMP_SUMS]: 'Lump Sums',
  [VET_VISITS]: 'Vet Visits',
  [CS]: 'CS',
  [BPS]: 'BPS',
  [FDMR]: 'FDMR',
  [MANUAL]: 'Manual',
  [ES]: 'ES',
  [FC]: 'FC',
  [IMPS]: 'IMPS',
  [SFI23]: 'SFI23',
  [DELINKED]: 'Delinked'
}
