const _ = require('lodash')
const logger = require('../lib/logger')
const exceptions = require('../lib/exceptions')
const equipments = require('../service').equipments
const SequelizeEmptyResultError = require('../models').Sequelize
  .EmptyResultError

module.exports = {
  createEquipment: (req, res) => {
    return equipments.create(req.body)
      .then(newEquipment => equipments.fullRes(newEquipment))
      .then(output =>
        res.status(201).send(simpleRes('Successfully Created Equipment', output))
      )
      .catch(exceptions.InvalidInputError, err =>
        res.status(400).send(invalidInputRes(0, err.errors))
      )
      .catch(err => {
        logger.error(err)
        return res.status(500).send()
      })
  },
  listEquipments: (req, res) => {
    const limit = req.swagger.params.limit.value
    const offset = req.swagger.params.offset.value

    const options = {
      limit: req.swagger.params.limit.value,
      offset: req.swagger.params.offset.value
    }
    const parsedEvents = []
    let searchResult = []
    return equipments
      .search(options)
      .then(result => {
        searchResult = result
        const promises = []
        _.forEach(searchResult.objects, equipment => {
          promises.push(
            equipments.fullRes(equipment).then(data => {
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
  getEquipment: (req, res) => {
    logger.info('Getting a equipment')
    const id = req.swagger.params.equipmentId.value
    return equipments
      .get(id, { rejectOnEmpty: true })
      .then(equipment => equipments.fullRes(equipment))
      .then(data =>
        res.status(200).send(simpleRes('Successfully Retrieved Equipment', data))
      )
      .catch(SequelizeEmptyResultError, () => res.status(404).send())
      .catch(err => {
        logger.error(err)
        res.status(500).send()
      })
  },
  modifyEquipment: (req, res) => {
    logger.info('Modifying a equipment')
    const id = req.swagger.params.equipmentId.value

    return equipments.modify(id, req.body)
      .then(prod => equipments.fullRes(prod))
      .then(data =>
        res.status(201).send(simpleRes('Successfully Modified Equipment', data))
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
  deleteEquipment: (req, res) => {
    logger.info('Deleting a equipment')
    const equipmentId = req.swagger.params.equipmentId.value
    let response = {}
    return equipments
      .get(equipmentId, { rejectOnEmpty: true })
      .then(equipment => equipments.fullRes(equipment))
      .then(data => {
        response = data
        return equipments.delete(equipmentId)
      })
      .then(() =>
        res
          .status(200)
          .send(simpleRes('Successfully Deleted Equipment', response))
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
