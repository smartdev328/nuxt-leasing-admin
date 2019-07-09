const db = require('../models')
function run() {
  db.User.findAll().then(users => {
    if (users.length === 0) {
      const arrUser = [
        {
          username: 'admin',
          email: 'admin@email.com',
          password: 'admin123',
          isAdmin: true
        }
      ]
      db.User.bulkCreate(arrUser).then(() => {})
    }
  })
}

module.exports = {
  run: run
}
