'use strict'

const Promise = require('bluebird')
const Equipments = require('../../models').Equipment

module.exports = {
  search: options => {
    const where = {}
    const include = []

    return Promise.props({
      count: Equipments.count({
        where: where,
        include: include
      }),
      objects: Equipments.findAll({
        where: where,
        include: include,
        limit: options.limit,
        offset: options.offset
      })
    })
  },
  fullRes: equipment => {
    const output = {}
    output.id = equipment.id
    output.name = equipment.name
    output.price = equipment.price
    output.icon = equipment.icon
    output.createdAt = equipment.createdAt
    output.updatedAt = equipment.updatedAt
    return new Promise(resolve => resolve(output))
  }
}
