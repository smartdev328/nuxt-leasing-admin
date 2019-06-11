const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../../config/config')
const db = {}

const sequelize = new Sequelize(config.db, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
})

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
  if ('hooks' in db[modelName]) {
    db[modelName].hooks(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
