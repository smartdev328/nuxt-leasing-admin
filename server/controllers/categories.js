const _ = require('lodash')
const logger = require('../lib/logger')
const exceptions = require('../lib/exceptions')
const categories = require('../service').categories
const SequelizeEmptyResultError = require('../models').Sequelize
  .EmptyResultError

module.exports = {
  createCategory: (req, res) => {
    return categories.create(req.body)
      .then(newCategory => categories.fullRes(newCategory))
      .then(output =>
        res.status(201).send(simpleRes('Successfully Created Category', output))
      )
      .catch(exceptions.InvalidInputError, err =>
        res.status(400).send(invalidInputRes(0, err.errors))
      )
      .catch(err => {
        logger.error(err)
        return res.status(500).send()
      })
  },
  listCategories: (req, res) => {
    const limit = req.swagger.params.limit.value
    const offset = req.swagger.params.offset.value

    const options = {
      limit: req.swagger.params.limit.value,
      offset: req.swagger.params.offset.value
    }
    const parsedEvents = []
    let searchResult = []
    return categories
      .search(options)
      .then(result => {
        searchResult = result
        const promises = []
        _.forEach(searchResult.objects, category => {
          promises.push(
            categories.fullRes(category).then(data => {
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
  getCategory: (req, res) => {
    logger.info('Getting a category')
    const id = req.swagger.params.categoryId.value
    return categories
      .get(id, { rejectOnEmpty: true })
      .then(category => categories.fullRes(category))
      .then(data =>
        res.status(200).send(simpleRes('Successfully Retrieved Category', data))
      )
      .catch(SequelizeEmptyResultError, () => res.status(404).send())
      .catch(err => {
        logger.error(err)
        res.status(500).send()
      })
  },
  modifyCategory: (req, res) => {
    logger.info('Modifying a category')
    const id = req.swagger.params.categoryId.value

    return categories.modify(id, req.body)
      .then(prod => categories.fullRes(prod))
      .then(data =>
        res.status(201).send(simpleRes('Successfully Modified Category', data))
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
  deleteCategory: (req, res) => {
    logger.info('Deleting a category')
    const categoryId = req.swagger.params.categoryId.value
    let response = {}
    return categories
      .get(categoryId, { rejectOnEmpty: true })
      .then(category => categories.fullRes(category))
      .then(data => {
        response = data
        return categories.delete(categoryId)
      })
      .then(() =>
        res
          .status(200)
          .send(simpleRes('Successfully Deleted Category', response))
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
