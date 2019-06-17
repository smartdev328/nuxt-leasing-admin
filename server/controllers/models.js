const _ = require('lodash')
const logger = require('../lib/logger')
const models = require('../service').models
const SequelizeEmptyResultError = require('../models').Sequelize
  .EmptyResultError

module.exports = {
  listModels: (req, res) => {
    const limit = req.swagger.params.limit.value
    const offset = req.swagger.params.offset.value

    const options = {
      brand: req.swagger.params.brand.value,
      limit: req.swagger.params.limit.value,
      offset: req.swagger.params.offset.value
    }
    const parsedEvents = []
    let searchResult = []
    return models
      .search(options)
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
          .send(searchRes(parsedEvents, searchResult.count, offset, limit))
      )
      .catch(SequelizeEmptyResultError, () => res.status(404).send())
      .catch(err => {
        logger.error(err)
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

const simpleRes = (message, data) => ({
  message: message,
  data: data
})
