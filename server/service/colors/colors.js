'use strict'

const _ = require('lodash')
const Promise = require('bluebird')
const Colors = require('../../models').Color

module.exports = {
  create: params => {
    return Colors.create({
      name: params.name,
      hex_color: params.hexColor,
      price: params.price
    })
  },
  search: options => {
    const where = {}
    const include = []

    return Promise.props({
      count: Colors.count({
        where: where,
        include: include
      }),
      objects: Colors.findAll({
        where: where,
        include: include,
        limit: options.limit,
        offset: options.offset,
        order: [
          ['id', 'ASC']
        ]
      })
    })
  },
  modify: (colorId, params) => {
    const id = colorId
    return Colors.findOne({
      where: { id: id },
      rejectOnEmpty: true
    })
      .then(color =>
        Promise.props({
          colorUpdate: color.update({
            name: params.name,
            hex_color: params.hexColor,
            price: params.price
          })
        })
      )
      .then(result => result.colorUpdate)
  },
  get: (colorId, options = {}) => {
    const id = colorId
    return Colors.findOne({
      where: { id: id },
      rejectOnEmpty: options.rejectOnEmpty ? options.rejectOnEmpty : false
    })
  },
  delete: colorId => {
    return Colors.destroy({
      where: { id: colorId },
      rejectOnEmpty: true
    })
  },
  fullRes: color => {
    const output = _.clone(colorModel)
    output.id = color.id
    output.name = color.name
    output.price = color.price
    output.hexColor = color.hex_color
    output.createdAt = color.createdAt
    output.updatedAt = color.updatedAt
    return new Promise(resolve => resolve(output))
  }
}

const colorModel = {
  id: undefined,
  name: undefined,
  price: undefined,
  hexColor: undefined,
  createdAt: undefined,
  updatedAt: undefined
}
