const db = require('../models')
function run() {
  db.Equipment.findAll().then(Equipments => {
    if (Equipments.length === 0) {
      const arrEquipment = [
        {
          name: 'Snow Tires',
          price: 1500
        },
        {
          name: 'Tow',
          price: 1800
        },
        {
          name: 'Sear warmer',
          price: 5000
        }
      ]
      db.Equipment.bulkCreate(arrEquipment).then(() => {})
    }
  })
}

module.exports = {
  run: run
}
