const _ = require('lodash')
const logger = require('../lib/logger')
const professions = require('../service').professions
const SequelizeEmptyResultError = require('../models').Sequelize
  .EmptyResultError

module.exports = {
  listProfessions: (req, res) => {
    const limit = req.swagger.params.limit.value
    const offset = req.swagger.params.offset.value

    const options = {
      limit: req.swagger.params.limit.value,
      offset: req.swagger.params.offset.value
    }
    const parsedEvents = []
    let searchResult = []
    return professions
      .search(options)
      .then(result => {
        searchResult = result
        const promises = []
        _.forEach(searchResult.objects, profession => {
          promises.push(
            professions.fullRes(profession).then(data => {
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
  }
}

const searchRes = (datas, total, offset, limit) => ({
  message: total > 0 ? `Found ${total} result(s)` : 'No results found',
  total: total,
  offset: offset,
  limit: limit,
  results: datas
})
