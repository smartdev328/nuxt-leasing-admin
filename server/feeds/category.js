const db = require('../models')
function run() {
  db.Category.findAll().then(categorys => {
    if (categorys.length === 0) {
      const arrCategory = [
        {
          name: 'A smiths choice'
        },
        {
          name: 'A plumbers Favorite'
        },
        {
          name: 'Easy and handy'
        }
      ]
      db.Category.bulkCreate(arrCategory).then(() => {})
    }
  })
}

module.exports = {
  run: run
}
