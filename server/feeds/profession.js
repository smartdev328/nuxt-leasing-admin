const db = require('../models')
function run() {
  db.Profession.findAll().then(Professions => {
    if (Professions.length === 0) {
      const arrProfession = [
        {
          name: 'Plumber',
          price: 13500,
          short_description: 'Lorem ipsum'
        },
        {
          name: 'Carpenter',
          price: 22500,
          short_description: 'Lorem ipsum'
        },
        {
          name: 'Electrician',
          price: 17500,
          short_description: 'Lorem ipsum'
        }
      ]
      db.Profession.bulkCreate(arrProfession).then(() => {})
    }
  })
}

module.exports = {
  run: run
}
