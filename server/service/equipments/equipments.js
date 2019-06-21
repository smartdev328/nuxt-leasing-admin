'use strict'

const Promise = require('bluebird')
const Equipments = require('../../models').Equipment

module.exports = {
  create: params => {
    return Equipments.create({
      name: params.name,
      price: params.price,
      icon: params.icon
    })
  },
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
  modify: (equipmentId, params) => {
    const id = equipmentId
    return Equipments.findOne({
      where: { id: id },
      rejectOnEmpty: true
    })
      .then(equipment =>
        Promise.props({
          equipmentUpdate: equipment.update({
            name: params.name
          })
        })
      )
      .then(result => result.equipmentUpdate)
  },
  get: (equipmentId, options = {}) => {
    const id = equipmentId
    return Equipments.findOne({
      where: { id: id },
      rejectOnEmpty: options.rejectOnEmpty ? options.rejectOnEmpty : false
    })
  },
  delete: equipmentId => {
    return Equipments.destroy({
      where: { id: equipmentId },
      rejectOnEmpty: true
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
