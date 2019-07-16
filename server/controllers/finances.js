const Sentry = require('@sentry/node')

const logger = require('../lib/logger')
const exceptions = require('../lib/exceptions')
const finances = require('../service').finances
const SequelizeEmptyResultError = require('../models').Sequelize
  .EmptyResultError

module.exports = {
  getFinance: (req, res) => {
    logger.info('Getting a finance')
    const id = req.swagger.params.financeId.value
    return finances
      .get(id, { rejectOnEmpty: true })
      .then(finance => finances.fullRes(finance))
      .then(data =>
        res.status(200).send(simpleRes('Successfully Retrieved Finance', data))
      )
      .catch(SequelizeEmptyResultError, () => res.status(404).send())
      .catch(err => {
        logger.error(err)
        Sentry.captureException(err)
        res.status(500).send()
      })
  },
  modifyFinance: (req, res) => {
    logger.info('Modifying a finance')
    const id = req.swagger.params.financeId.value

    return finances.modify(id, req.body)
      .then(prod => finances.fullRes(prod))
      .then(data =>
        res.status(201).send(simpleRes('Successfully Modified Finance', data))
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
  }
}

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
