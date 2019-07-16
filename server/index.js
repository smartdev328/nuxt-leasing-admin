const express = require('express')
const consola = require('consola')
const async = require('async')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const Sentry = require('@sentry/node')

const config = require('../nuxt.config.js')
const models = require('./models')
const logger = require('./lib/logger')

// Import and Set Nuxt.js options
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  const allowFeedData = false
  // Listen the server
  async.series(
    [
      cb => {
        consola.info('Initializing Sequelize and connecting to database')
        models.sequelize.sync().then(() => {
          if (allowFeedData) {
            consola.info('Feeding Data')
            require('./feeds/user').run()
            require('./feeds/brand').run()
            require('./feeds/size').run()
            require('./feeds/color').run()
            require('./feeds/category').run()
            require('./feeds/equipment').run()
            require('./feeds/profession').run()
            require('./feeds/finance').run()
            require('./feeds/model').run()
            require('./feeds/product').run()
          }
          return cb()
        })
      },
      cb => {
        consola.info('Initializing server response compression')
        require('./config/compression')(app, cb)
      },
      cb => {
        consola.info('Initializing swagger middleware')
        require('./config/swagger')(app, cb)
      },
      cb => {
        consola.info('Initializing express middleware')
        require('./config/express')(app, cb)
      },
      cb => {
        // Sentry Init
        Sentry.init({ dsn: 'https://d85eaa392daf41a0b2aadaa138e61b8f@sentry.io/1504082' })
        return cb()
      }
    ],
    err => {
      if (err) {
        logger.error('Could not start app', err)
        Sentry.captureMessage('Admin CMS Server can not start running!', 'warning')
        Sentry.captureException(err)
        throw new Error('Could not start app')
      }
      app.use(nuxt.render)
      const port = process.env.PORT || 3000
      app.listen(port)
      Sentry.captureMessage('Admin CMS Server starts running!', 'info')
      consola.info('API listening on port', port)
    }
  )
}
start()
