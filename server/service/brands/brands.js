'use strict'

const _ = require('lodash')
const Promise = require('bluebird')
const Brands = require('../../models').Brand

module.exports = {
  create: params => {
    return Brands.create({
      name: params.name
    })
  },
  search: options => {
    const where = {}
    const include = []

    return Promise.props({
      count: Brands.count({
        where: where,
        include: include
      }),
      objects: Brands.findAll({
        where: where,
        include: include,
        limit: options.limit,
        offset: options.offset
      })
    })
  },
  modify: (brandId, params) => {
    const id = brandId
    return Brands.findOne({
      where: { id: id },
      rejectOnEmpty: true
    })
      .then(brand =>
        Promise.props({
          brandUpdate: brand.update({
            name: params.name
          })
        })
      )
      .then(result => result.brandUpdate)
  },
  get: (brandId, options = {}) => {
    const id = brandId
    return Brands.findOne({
      where: { id: id },
      rejectOnEmpty: options.rejectOnEmpty ? options.rejectOnEmpty : false
    })
  },
  delete: brandId => {
    return Brands.destroy({
      where: { id: brandId },
      rejectOnEmpty: true
    })
  },
  fullRes: brand => {
    const output = _.clone(brandModel)
    output.id = brand.id
    output.name = brand.name
    output.createdAt = brand.createdAt
    output.updatedAt = brand.updatedAt
    return new Promise(resolve => resolve(output))
  }
}

const brandModel = {
  id: undefined,
  name: undefined,
  createdAt: undefined,
  updatedAt: undefined
}
