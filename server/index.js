const express = require('express')
const consola = require('consola')
const async = require('async')
const { Nuxt, Builder } = require('nuxt')
const app = express()

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

  const allowFeedData = true
  // Listen the server
  async.series(
    [
      cb => {
        consola.info('Initializing Sequelize and connecting to database')
        models.sequelize.sync().then(() => {
          if (allowFeedData) {
            consola.info('Feeding Data')
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
      }
    ],
    err => {
      if (err) {
        logger.error('Could not start app', err)
        throw new Error('Could not start app')
      }
      // Give nuxt middleware to express
      app.use(nuxt.render)
      const port = process.env.PORT || 5000
      app.listen(port)
      consola.info('API listening on port', port)
    }
  )
}
start()
