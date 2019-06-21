'use strict'

const Promise = require('bluebird')
const Professions = require('../../models').Profession

module.exports = {
  search: options => {
    const where = {}
    const include = []

    return Promise.props({
      count: Professions.count({
        where: where,
        include: include
      }),
      objects: Professions.findAll({
        where: where,
        include: include,
        limit: options.limit,
        offset: options.offset
      })
    })
  },
  fullRes: profession => {
    const output = {}
    output.id = profession.id
    output.name = profession.name
    output.price = profession.price
    output.link = profession.link
    output.icon = profession.icon
    output.shortDescription = profession.shortDescription
    output.createdAt = profession.createdAt
    output.updatedAt = profession.updatedAt
    return new Promise(resolve => resolve(output))
  }
}
