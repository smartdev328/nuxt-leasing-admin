'use strict'

const Promise = require('bluebird')
const Professions = require('../../models').Profession

module.exports = {
  create: params => {
    return Professions.create({
      name: params.name,
      price: params.price,
      icon: params.icon,
      link: params.link,
      shortDescription: params.shortDescription
    })
  },
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
  modify: (equipmentId, params) => {
    const id = equipmentId
    return Professions.findOne({
      where: { id: id },
      rejectOnEmpty: true
    })
      .then(equipment =>
        Promise.props({
          equipmentUpdate: equipment.update({
            name: params.name,
            price: params.price,
            icon: params.icon,
            link: params.link,
            shortDescription: params.shortDescription
          })
        })
      )
      .then(result => result.equipmentUpdate)
  },
  get: (equipmentId, options = {}) => {
    const id = equipmentId
    return Professions.findOne({
      where: { id: id },
      rejectOnEmpty: options.rejectOnEmpty ? options.rejectOnEmpty : false
    })
  },
  delete: equipmentId => {
    return Professions.destroy({
      where: { id: equipmentId },
      rejectOnEmpty: true
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
