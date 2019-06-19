const _ = require('lodash')
const logger = require('../lib/logger')
const exceptions = require('../lib/exceptions')
const colors = require('../service').colors
const SequelizeEmptyResultError = require('../models').Sequelize
  .EmptyResultError

module.exports = {
  createColor: (req, res) => {
    return colors.create(req.body)
      .then(newColor => colors.fullRes(newColor))
      .then(output =>
        res.status(201).send(simpleRes('Successfully Created Color', output))
      )
      .catch(exceptions.InvalidInputError, err =>
        res.status(400).send(invalidInputRes(0, err.errors))
      )
      .catch(err => {
        logger.error(err)
        return res.status(500).send()
      })
  },
  listColors: (req, res) => {
    const limit = req.swagger.params.limit.value
    const offset = req.swagger.params.offset.value

    const options = {
      limit: req.swagger.params.limit.value,
      offset: req.swagger.params.offset.value
    }
    const parsedEvents = []
    let searchResult = []
    return colors
      .search(options)
      .then(result => {
        searchResult = result
        const promises = []
        _.forEach(searchResult.objects, color => {
          promises.push(
            colors.fullRes(color).then(data => {
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
  getColor: (req, res) => {
    logger.info('Getting a color')
    const id = req.swagger.params.colorId.value
    return colors
      .get(id, { rejectOnEmpty: true })
      .then(color => colors.fullRes(color))
      .then(data =>
        res.status(200).send(simpleRes('Successfully Retrieved Color', data))
      )
      .catch(SequelizeEmptyResultError, () => res.status(404).send())
      .catch(err => {
        logger.error(err)
        res.status(500).send()
      })
  },
  modifyColor: (req, res) => {
    logger.info('Modifying a color')
    const id = req.swagger.params.colorId.value

    return colors.modify(id, req.body)
      .then(prod => colors.fullRes(prod))
      .then(data =>
        res.status(201).send(simpleRes('Successfully Modified Color', data))
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
  deleteColor: (req, res) => {
    logger.info('Deleting a color')
    const colorId = req.swagger.params.colorId.value
    let response = {}
    return colors
      .get(colorId, { rejectOnEmpty: true })
      .then(color => colors.fullRes(color))
      .then(data => {
        response = data
        return colors.delete(colorId)
      })
      .then(() =>
        res
          .status(200)
          .send(simpleRes('Successfully Deleted Color', response))
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
