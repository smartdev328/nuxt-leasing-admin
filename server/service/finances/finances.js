'use strict'

const Promise = require('bluebird')
const Finances = require('../../models').Finance

module.exports = {
  modify: (financeId, params) => {
    const id = financeId
    return Finances.findOne({
      where: { id: id },
      rejectOnEmpty: true
    })
      .then(finance =>
        Promise.props({
          financeUpdate: finance.update({
            rate: params.rate,
            downpayment1: params.downpayment1,
            downpayment2: params.downpayment2,
            downpayment3: params.downpayment3
          })
        })
      )
      .then(result => result.financeUpdate)
  },
  get: (financeId, options = {}) => {
    const id = financeId
    return Finances.findOne({
      where: { id: id },
      rejectOnEmpty: options.rejectOnEmpty ? options.rejectOnEmpty : false
    })
  },
  fullRes: finance => {
    const output = {}
    output.id = finance.id
    output.rate = finance.rate
    output.downpayment1 = finance.downpayment1
    output.downpayment2 = finance.downpayment2
    output.downpayment3 = finance.downpayment3
    return new Promise(resolve => resolve(output))
  }
}
