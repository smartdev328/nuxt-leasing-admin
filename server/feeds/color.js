const db = require('../models')
function run() {
  db.Color.findAll().then(Colors => {
    if (Colors.length === 0) {
      const arrColor = [
        {
          name: 'Black',
          hex_color: '#000000',
          price: 0
        },
        {
          name: 'White',
          hex_color: '#ffffff',
          price: 0
        },
        {
          name: 'Red',
          hex_color: '#ff0000',
          price: 5000
        }
      ]
      db.Color.bulkCreate(arrColor).then(() => {})
    }
  })
}

module.exports = {
  run: run
}
