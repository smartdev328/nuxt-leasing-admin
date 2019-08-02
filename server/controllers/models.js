const _ = require('lodash')
const Sentry = require('@sentry/node')

const logger = require('../lib/logger')
const exceptions = require('../lib/exceptions')
const models = require('../service').models
const SequelizeEmptyResultError = require('../models').Sequelize
  .EmptyResultError

module.exports = {
  createModel: (req, res) => {
    return models.create(req.body)
      .then(newModel => models.fullRes(newModel))
      .then(output =>
        res.status(201).send(simpleRes('Successfully Created Model', output))
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
  listModels: (req, res) => {
    const limit = req.swagger.params.limit.value
    const offset = req.swagger.params.offset.value

    const options = {
      brand: req.swagger.params.brand.value,
      limit: req.swagger.params.limit.value,
      offset: req.swagger.params.offset.value
    }

    const sortBy = []
    const sortParams = JSON.parse(req.swagger.params.sortby.value)
    if (sortParams.option && sortParams.direction) {
      if (sortParams.option === 'brand') {
        sortParams.option = 'brandId'
      }
      sortBy.push([ sortParams.option, sortParams.direction ])
    } else {
      sortBy.push(['id', 'ASC'])
    }

    const parsedEvents = []
    let searchResult = []
    return models
      .search(options, sortBy)
      .then(result => {
        searchResult = result
        const promises = []
        _.forEach(searchResult.objects, model => {
          promises.push(
            models.fullRes(model).then(data => {
              parsedEvents.push(data)
            })
          )
        })
        return Promise.all(promises)
      })
      .then(() =>
        res
          .status(200)
          .send(searchRes(parsedEvents, searchResult.count, offset, limit, sortParams))
      )
      .catch(SequelizeEmptyResultError, () => res.status(404).send())
      .catch(err => {
        logger.error(err)
        Sentry.captureException(err)
        return res.status(500).send(err)
      })
  },
  getModel: (req, res) => {
    logger.info('Getting a model')
    const id = req.swagger.params.modelId.value
    return models
      .get(id, { rejectOnEmpty: true })
      .then(model => models.fullRes(model))
      .then(data =>
        res.status(200).send(simpleRes('Successfully Retrieved Model', data))
      )
      .catch(SequelizeEmptyResultError, () => res.status(404).send())
      .catch(err => {
        logger.error(err)
        Sentry.captureException(err)
        res.status(500).send()
      })
  },
  modifyModel: (req, res) => {
    logger.info('Modifying a model')
    const id = req.swagger.params.modelId.value

    return models.modify(id, req.body)
      .then(prod => models.fullRes(prod))
      .then(data =>
        res.status(201).send(simpleRes('Successfully Modified Model', data))
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
  deleteModel: (req, res) => {
    logger.info('Deleting a model')
    const modelId = req.swagger.params.modelId.value
    let response = {}
    return models
      .get(modelId, { rejectOnEmpty: true })
      .then(model => models.fullRes(model))
      .then(data => {
        response = data
        return models.delete(modelId)
      })
      .then(() =>
        res
          .status(200)
          .send(simpleRes('Successfully Deleted Model', response))
      )
      .catch(SequelizeEmptyResultError, () => res.status(404).send())
      .catch(err => {
        logger.error(err)
        Sentry.captureException(err)
        res.status(500).send()
      })
  }
}

const searchRes = (datas, total, offset, limit, sortBy) => ({
  message: total > 0 ? `Found ${total} result(s)` : 'No results found',
  total: total,
  offset: offset,
  limit: limit,
  results: _.orderBy(datas, [sortBy.option], [sortBy.direction])
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
