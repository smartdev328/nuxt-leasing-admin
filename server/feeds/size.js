const db = require('../models')
function run() {
  db.Size.findAll().then(Sizes => {
    if (Sizes.length === 0) {
      const arrSize = [
        {
          name: 'small'
        },
        {
          name: 'medium'
        },
        {
          name: 'large'
        }
      ]
      db.Size.bulkCreate(arrSize).then(() => {})
    }
  })
}

module.exports = {
  run: run
}
