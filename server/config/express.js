const bodyParser = require('body-parser')
const morgan = require('morgan')

module.exports = (app, cb) => {
  // Configure the request logger middleware
  //  Only if we're not in a test environment
  if (process.env.NODE_ENV && process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'))
  }

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  cb()
}
