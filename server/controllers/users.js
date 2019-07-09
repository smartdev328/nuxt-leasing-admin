const _ = require('lodash')
const logger = require('../lib/logger')
const exceptions = require('../lib/exceptions')
const users = require('../service').users
const SequelizeEmptyResultError = require('../models').Sequelize
  .EmptyResultError

module.exports = {
  createUser: (req, res) => {
    return users.create(req.body)
      .then(newUser => users.fullRes(newUser))
      .then(output =>
        res.status(201).send(simpleRes('Successfully Created User', output))
      )
      .catch(exceptions.InvalidInputError, err =>
        res.status(400).send(invalidInputRes(0, err.errors))
      )
      .catch(err => {
        logger.error(err)
        return res.status(500).send()
      })
  },
  listUsers: (req, res) => {
    const limit = req.swagger.params.limit.value
    const offset = req.swagger.params.offset.value

    const options = {
      limit: req.swagger.params.limit.value,
      offset: req.swagger.params.offset.value
    }
    const parsedEvents = []
    let searchResult = []
    return users
      .search(options)
      .then(result => {
        searchResult = result
        const promises = []
        _.forEach(searchResult.objects, user => {
          promises.push(
            users.fullRes(user).then(data => {
              parsedEvents.push(data)
            })
          )
        })
        return Promise.all(promises)
      })
      .then(() =>
        res
          .status(200)
          .send(searchRes(parsedEvents, searchResult.count, offset, limit))
      )
      .catch(SequelizeEmptyResultError, () => res.status(404).send())
      .catch(err => {
        logger.error(err)
        return res.status(500).send(err)
      })
  },
  getUser: (req, res) => {
    logger.info('Getting a user')
    const id = req.swagger.params.userId.value
    return users
      .get(id, { rejectOnEmpty: true })
      .then(user => users.fullRes(user))
      .then(data =>
        res.status(200).send(simpleRes('Successfully Retrieved User', data))
      )
      .catch(SequelizeEmptyResultError, () => res.status(404).send())
      .catch(err => {
        logger.error(err)
        res.status(500).send()
      })
  },
  modifyUser: (req, res) => {
    logger.info('Modifying a user')
    const id = req.swagger.params.userId.value

    return users.modify(id, req.body)
      .then(prod => users.fullRes(prod))
      .then(data =>
        res.status(201).send(simpleRes('Successfully Modified User', data))
      )
      .catch(exceptions.InvalidInputError, err =>
        res.status(400).send(invalidInputRes(0, err.errors))
      )
      .catch(SequelizeEmptyResultError, () => res.status(404).send())
      .catch(err => {
        logger.error(err)
        return res.status(500).send()
      })
  },
  deleteUser: (req, res) => {
    logger.info('Deleting a user')
    const userId = req.swagger.params.userId.value
    let response = {}
    return users
      .get(userId, { rejectOnEmpty: true })
      .then(user => users.fullRes(user))
      .then(data => {
        response = data
        return users.delete(userId)
      })
      .then(() =>
        res
          .status(200)
          .send(simpleRes('Successfully Deleted User', response))
      )
      .catch(SequelizeEmptyResultError, () => res.status(404).send())
      .catch(err => {
        logger.error(err)
        res.status(500).send()
      })
  },
  authUser: (req, res) => {
    return users.authenticate(req.body)
      .then(result => users.fullResWithToken(result))
      .then(data =>
        res.status(200).send(simpleRes('Successfully Authenticated User', data))
      )
      .catch(exceptions.InvalidInputError, err =>
        res.status(400).send(invalidInputRes(0, err.errors))
      )
      .catch(SequelizeEmptyResultError, () => res.status(401).send())
      .catch(err => {
        logger.error(err)
        return res.status(500).send()
      })
  }
}

const searchRes = (datas, total, offset, limit) => ({
  message: total > 0 ? `Found ${total} result(s)` : 'No results found',
  total: total,
  offset: offset,
  limit: limit,
  results: _.orderBy(datas, ['id'], ['asc'])
})

const invalidInputRes = (code, err) => ({
  status: 400,
  code: code,
  message: 'Invalid Input(s)',
  errors: err
})

const simpleRes = (message, data) => ({
  message: message,
  data: data
})
