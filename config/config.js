const path = require('path')
const rootPath = path.normalize(path.join(__dirname, '/..'))
const env = process.env.NODE_ENV || 'development'

const config = {
  development: {
    root: rootPath,
    port: process.env.PORT || 3000,
    db:
      'postgres://jtgjywzn:Y2eniWMwXjB01jJUMABeHrcHIYXOyRCz@mild-feijoa.db.elephantsql.com:5432/jtgjywzn'
  },

  test: {
    root: rootPath,
    port: process.env.PORT || 3000,
    db:
      'postgres://jtgjywzn:Y2eniWMwXjB01jJUMABeHrcHIYXOyRCz@mild-feijoa.db.elephantsql.com:5432/jtgjywzn'
  },

  production: {
    root: rootPath,
    port: process.env.PORT || 3000,
    db:
      'postgres://jtgjywzn:Y2eniWMwXjB01jJUMABeHrcHIYXOyRCz@mild-feijoa.db.elephantsql.com:5432/jtgjywzn'
  }
}

module.exports = config[env]
