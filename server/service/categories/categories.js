'use strict'

const _ = require('lodash')
const Promise = require('bluebird')
const Categories = require('../../models').Category

module.exports = {
  create: params => {
    return Categories.create({
      name: params.name
    })
  },
  search: options => {
    const where = {}
    const include = []

    return Promise.props({
      count: Categories.count({
        where: where,
        include: include
      }),
      objects: Categories.findAll({
        where: where,
        include: include,
        limit: options.limit,
        offset: options.offset
      })
    })
  },
  modify: (categoryId, params) => {
    const id = categoryId
    return Categories.findOne({
      where: { id: id },
      rejectOnEmpty: true
    })
      .then(category =>
        Promise.props({
          categoryUpdate: category.update({
            name: params.name
          })
        })
      )
      .then(result => result.categoryUpdate)
  },
  get: (categoryId, options = {}) => {
    const id = categoryId
    return Categories.findOne({
      where: { id: id },
      rejectOnEmpty: options.rejectOnEmpty ? options.rejectOnEmpty : false
    })
  },
  delete: categoryId => {
    return Categories.destroy({
      where: { id: categoryId },
      rejectOnEmpty: true
    })
  },
  fullRes: category => {
    const output = _.clone(categoryModel)
    output.id = category.id
    output.name = category.name
    output.createdAt = category.createdAt
    output.updatedAt = category.updatedAt
    return new Promise(resolve => resolve(output))
  }
}

const categoryModel = {
  id: undefined,
  name: undefined,
  createdAt: undefined,
  updatedAt: undefined
}
