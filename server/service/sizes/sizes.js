'use strict'

const _ = require('lodash')
const Promise = require('bluebird')
const Sizes = require('../../models').Size

module.exports = {
  create: params => {
    return Sizes.create({
      name: params.name
    })
  },
  search: options => {
    const where = {}
    const include = []

    return Promise.props({
      count: Sizes.count({
        where: where,
        include: include
      }),
      objects: Sizes.findAll({
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
  modify: (sizeId, params) => {
    const id = sizeId
    return Sizes.findOne({
      where: { id: id },
      rejectOnEmpty: true
    })
      .then(size =>
        Promise.props({
          sizeUpdate: size.update({
            name: params.name
          })
        })
      )
      .then(result => result.sizeUpdate)
  },
  get: (sizeId, options = {}) => {
    const id = sizeId
    return Sizes.findOne({
      where: { id: id },
      rejectOnEmpty: options.rejectOnEmpty ? options.rejectOnEmpty : false
    })
  },
  delete: sizeId => {
    return Sizes.destroy({
      where: { id: sizeId },
      rejectOnEmpty: true
    })
  },
  fullRes: size => {
    const output = _.clone(sizeModel)
    output.id = size.id
    output.name = size.name
    output.createdAt = size.createdAt
    output.updatedAt = size.updatedAt
    return new Promise(resolve => resolve(output))
  }
}

const sizeModel = {
  id: undefined,
  name: undefined,
  createdAt: undefined,
  updatedAt: undefined
}
