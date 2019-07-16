const _ = require('lodash')
const Sentry = require('@sentry/node')

const logger = require('../lib/logger')
const exceptions = require('../lib/exceptions')
const brands = require('../service').brands
const SequelizeEmptyResultError = require('../models').Sequelize
  .EmptyResultError

module.exports = {
  createBrand: (req, res) => {
    return brands.create(req.body)
      .then(newBrand => brands.fullRes(newBrand))
      .then(output =>
        res.status(201).send(simpleRes('Successfully Created Brand', output))
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
  listBrands: (req, res) => {
    const limit = req.swagger.params.limit.value
    const offset = req.swagger.params.offset.value

    const options = {
      limit: req.swagger.params.limit.value,
      offset: req.swagger.params.offset.value
    }
    const parsedEvents = []
    let searchResult = []
    return brands
      .search(options)
      .then(result => {
        searchResult = result
        const promises = []
        _.forEach(searchResult.objects, brand => {
          promises.push(
            brands.fullRes(brand).then(data => {
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
  getBrand: (req, res) => {
    logger.info('Getting a brand')
    const id = req.swagger.params.brandId.value
    return brands
      .get(id, { rejectOnEmpty: true })
      .then(brand => brands.fullRes(brand))
      .then(data =>
        res.status(200).send(simpleRes('Successfully Retrieved Brand', data))
      )
      .catch(SequelizeEmptyResultError, () => res.status(404).send())
      .catch(err => {
        logger.error(err)
        Sentry.captureException(err)
        res.status(500).send()
      })
  },
  modifyBrand: (req, res) => {
    logger.info('Modifying a brand')
    const id = req.swagger.params.brandId.value

    return brands.modify(id, req.body)
      .then(prod => brands.fullRes(prod))
      .then(data =>
        res.status(201).send(simpleRes('Successfully Modified Brand', data))
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
  deleteBrand: (req, res) => {
    logger.info('Deleting a brand')
    const brandId = req.swagger.params.brandId.value
    let response = {}
    return brands
      .get(brandId, { rejectOnEmpty: true })
      .then(brand => brands.fullRes(brand))
      .then(data => {
        response = data
        return brands.delete(brandId)
      })
      .then(() =>
        res
          .status(200)
          .send(simpleRes('Successfully Deleted Brand', response))
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
