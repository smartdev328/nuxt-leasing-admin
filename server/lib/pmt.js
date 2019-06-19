
// eslint-disable-next-line no-unused-vars
const PMT = (rate, nper, pv, fv, type) => {
  if (!fv) fv = 0
  if (!type) type = 0
  if (rate === 0) return -(pv + fv) / nper
  const pvif = Math.pow(1 + rate, nper)
  let pmt = (rate / (pvif - 1)) * -(pv * pvif + fv)
  if (type === 1) {
    pmt = pmt / (1 + rate)
  }
  return Math.ceil(pmt / 10) * 10
}

// eslint-disable-next-line no-unused-vars
const getMonthlyPrice = (
  rate, // Percentage Value: 2.75%
  leasingPeriod, // options values: 12, 24, 36, 48, 60, 72
  acquisitionCost,
  scrapValue,
  downpayment,
  colorPrice,
  equipmentPrice,
  professionPrice,
  type = 1
) => {
  const decimalRate = rate / 100
  const calculatedAcquisitionCost =
    acquisitionCost -
    downpayment -
    colorPrice -
    equipmentPrice -
    professionPrice
  const monthlyPrice = PMT(
    decimalRate / 12,
    leasingPeriod,
    -calculatedAcquisitionCost,
    scrapValue,
    type
  )
  return Math.ceil(monthlyPrice / 10) * 10
}

module.exports = getMonthlyPrice
