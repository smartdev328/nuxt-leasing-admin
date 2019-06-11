const db = require('../models')
function run() {
  db.Brand.findAll().then(brands => {
    if (brands.length === 0) {
      const arrBrand = [
        {
          name: 'Volkswagen'
        },
        {
          name: 'Volvo'
        },
        {
          name: 'Mazda'
        },
        {
          name: 'BMW'
        },
        {
          name: 'Mercedes'
        },
        {
          name: 'Ford'
        },
        {
          name: 'Nissan'
        }
      ]
      db.Brand.bulkCreate(arrBrand).then(() => {})
    }
  })
}

module.exports = {
  run: run
}
