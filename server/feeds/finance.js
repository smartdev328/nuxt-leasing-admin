const db = require('../models')
function run() {
  db.Finance.findAll().then(Finances => {
    if (Finances.length === 0) {
      const arrFinance = [
        {
          rate: 2.75,
          downpayment1: 0,
          downpayment2: 25000,
          downpayment3: undefined
        }
      ]
      db.Finance.bulkCreate(arrFinance).then(() => {})
    }
  })
}

module.exports = {
  run: run
}
