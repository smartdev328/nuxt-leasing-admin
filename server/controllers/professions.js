const _ = require('lodash')
const logger = require('../lib/logger')
const exceptions = require('../lib/exceptions')
const professions = require('../service').professions
const SequelizeEmptyResultError = require('../models').Sequelize
  .EmptyResultError

module.exports = {
  createProfession: (req, res) => {
    return professions.create(req.body)
      .then(newProfession => professions.fullRes(newProfession))
      .then(output =>
        res.status(201).send(simpleRes('Successfully Created Profession', output))
      )
      .catch(exceptions.InvalidInputError, err =>
        res.status(400).send(invalidInputRes(0, err.errors))
      )
      .catch(err => {
        logger.error(err)
        return res.status(500).send()
      })
  },
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
  },
  getProfession: (req, res) => {
    logger.info('Getting a profession')
    const id = req.swagger.params.professionId.value
    return professions
      .get(id, { rejectOnEmpty: true })
      .then(profession => professions.fullRes(profession))
      .then(data =>
        res.status(200).send(simpleRes('Successfully Retrieved Profession', data))
      )
      .catch(SequelizeEmptyResultError, () => res.status(404).send())
      .catch(err => {
        logger.error(err)
        res.status(500).send()
      })
  },
  modifyProfession: (req, res) => {
    logger.info('Modifying a profession')
    const id = req.swagger.params.professionId.value

    return professions.modify(id, req.body)
      .then(prod => professions.fullRes(prod))
      .then(data =>
        res.status(201).send(simpleRes('Successfully Modified Profession', data))
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
  deleteProfession: (req, res) => {
    logger.info('Deleting a profession')
    const professionId = req.swagger.params.professionId.value
    let response = {}
    return professions
      .get(professionId, { rejectOnEmpty: true })
      .then(profession => professions.fullRes(profession))
      .then(data => {
        response = data
        return professions.delete(professionId)
      })
      .then(() =>
        res
          .status(200)
          .send(simpleRes('Successfully Deleted Profession', response))
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
