const _ = require('lodash')
const Sentry = require('@sentry/node')

const logger = require('../lib/logger')
const exceptions = require('../lib/exceptions')
const orders = require('../service').orders
const SequelizeEmptyResultError = require('../models').Sequelize
  .EmptyResultError

module.exports = {
  createOrder: (req, res) => {
    return orders.create(req.body)
      .then(newOrder => orders.fullRes(newOrder))
      .then(output =>
        res.status(201).send(simpleRes('Successfully Created Order', output))
      )
      .catch(exceptions.InvalidInputError, err =>
        res.status(400).send(invalidInputRes(0, err.errors))
      )
      .catch(err => {
        logger.error(err)
        Sentry.captureException(err)
        return res.status(500).send()
      })
  },
  listOrders: (req, res) => {
    const limit = req.swagger.params.limit.value
    const offset = req.swagger.params.offset.value

    const options = {
      model: req.swagger.params.model.value,
      color: req.swagger.params.color.value,
      username: req.swagger.params.username.value,
      email: req.swagger.params.email.value,
      variant: req.swagger.params.variant.value,
      companyName: req.swagger.params.companyName.value,
      cvr: req.swagger.params.cvr.value,
      companyIndustry: req.swagger.params.companyIndustry.value,
      numberOfEmployees: req.swagger.params.numberOfEmployees.value,
      monthlyPrice: req.swagger.params.monthlyPrice.value,
      status: req.swagger.params.status.value,
      limit: req.swagger.params.limit.value,
      offset: req.swagger.params.offset.value
    }
    const parsedEvents = []
    let searchResult = []
    return orders
      .search(options)
      .then(result => {
        searchResult = result
        const promises = []
        _.forEach(searchResult.objects, order => {
          promises.push(
            orders.fullRes(order).then(data => {
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
        Sentry.captureException(err)
        return res.status(500).send(err)
      })
  },
  getOrder: (req, res) => {
    logger.info('Getting a order')
    const id = req.swagger.params.orderId.value
    return orders
      .get(id, { rejectOnEmpty: true })
      .then(order => orders.fullRes(order))
      .then(data =>
        res.status(200).send(simpleRes('Successfully Retrieved Order', data))
      )
      .catch(SequelizeEmptyResultError, () => res.status(404).send())
      .catch(err => {
        logger.error(err)
        Sentry.captureException(err)
        res.status(500).send()
      })
  },
  modifyOrder: (req, res) => {
    logger.info('Modifying a order')
    const id = req.swagger.params.orderId.value

    return orders.modify(id, req.body)
      .then(prod => orders.fullRes(prod))
      .then(data =>
        res.status(201).send(simpleRes('Successfully Modified Order', data))
      )
      .catch(exceptions.InvalidInputError, err =>
        res.status(400).send(invalidInputRes(0, err.errors))
      )
      .catch(SequelizeEmptyResultError, () => res.status(404).send())
      .catch(err => {
        logger.error(err)
        Sentry.captureException(err)
        return res.status(500).send()
      })
  },
  deleteOrder: (req, res) => {
    logger.info('Deleting a order')
    const orderId = req.swagger.params.orderId.value
    let response = {}
    return orders
      .get(orderId, { rejectOnEmpty: true })
      .then(order => orders.fullRes(order))
      .then(data => {
        response = data
        return orders.delete(orderId)
      })
      .then(() =>
        res
          .status(200)
          .send(simpleRes('Successfully Deleted Order', response))
      )
      .catch(SequelizeEmptyResultError, () => res.status(404).send())
      .catch(err => {
        logger.error(err)
        Sentry.captureException(err)
        res.status(500).send()
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

const simpleRes = (message, data) => ({
  message: message,
  data: data
})

const invalidInputRes = (code, err) => ({
  status: 400,
  code: code,
  message: 'Invalid Input(s)',
  errors: err
})
