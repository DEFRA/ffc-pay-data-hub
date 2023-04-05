const {
  SFI,
  SFI_PILOT,
  LUMP_SUMS,
  VET_VISITS,
  CS,
  BPS,
  FDMR
} = require('./schemes')

module.exports = {
  [SFI]: 'SFI',
  [SFI_PILOT]: 'SFI Pilot',
  [LUMP_SUMS]: 'Lump Sums',
  [VET_VISITS]: 'Vet Visits',
  [CS]: 'CS',
  [BPS]: 'BPS',
  [FDMR]: 'FDMR'
}
