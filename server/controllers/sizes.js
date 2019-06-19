const _ = require('lodash')
const logger = require('../lib/logger')
const exceptions = require('../lib/exceptions')
const sizes = require('../service').sizes
const SequelizeEmptyResultError = require('../models').Sequelize
  .EmptyResultError

module.exports = {
  createSize: (req, res) => {
    return sizes.create(req.body)
      .then(newSize => sizes.fullRes(newSize))
      .then(output =>
        res.status(201).send(simpleRes('Successfully Created Size', output))
      )
      .catch(exceptions.InvalidInputError, err =>
        res.status(400).send(invalidInputRes(0, err.errors))
      )
      .catch(err => {
        logger.error(err)
        return res.status(500).send()
      })
  },
  listSizes: (req, res) => {
    const limit = req.swagger.params.limit.value
    const offset = req.swagger.params.offset.value

    const options = {
      limit: req.swagger.params.limit.value,
      offset: req.swagger.params.offset.value
    }
    const parsedEvents = []
    let searchResult = []
    return sizes
      .search(options)
      .then(result => {
        searchResult = result
        const promises = []
        _.forEach(searchResult.objects, size => {
          promises.push(
            sizes.fullRes(size).then(data => {
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
  getSize: (req, res) => {
    logger.info('Getting a size')
    const id = req.swagger.params.sizeId.value
    return sizes
      .get(id, { rejectOnEmpty: true })
      .then(size => sizes.fullRes(size))
      .then(data =>
        res.status(200).send(simpleRes('Successfully Retrieved Size', data))
      )
      .catch(SequelizeEmptyResultError, () => res.status(404).send())
      .catch(err => {
        logger.error(err)
        res.status(500).send()
      })
  },
  modifySize: (req, res) => {
    logger.info('Modifying a size')
    const id = req.swagger.params.sizeId.value

    return sizes.modify(id, req.body)
      .then(prod => sizes.fullRes(prod))
      .then(data =>
        res.status(201).send(simpleRes('Successfully Modified Size', data))
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
  deleteSize: (req, res) => {
    logger.info('Deleting a size')
    const sizeId = req.swagger.params.sizeId.value
    let response = {}
    return sizes
      .get(sizeId, { rejectOnEmpty: true })
      .then(size => sizes.fullRes(size))
      .then(data => {
        response = data
        return sizes.delete(sizeId)
      })
      .then(() =>
        res
          .status(200)
          .send(simpleRes('Successfully Deleted Size', response))
      )
      .catch(SequelizeEmptyResultError, () => res.status(404).send())
      .catch(err => {
        logger.error(err)
        res.status(500).send()
      })
  }
}

const searchRes = (datas, total, offset, limit) => ({
  message: total > 0 ? `Found ${total} result(s)` : 'No results found',
  total: total,
  offset: offset,
  limit: limit,
  results: datas
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
