'use strict'

const Promise = require('bluebird')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Models = require('../../models').Model

module.exports = {
  search: options => {
    const where = {}
    const include = []

    // Filters
    if (options.brand) {
      Object.assign(where, { brandId: { [Op.or]: options.brand } })
    }
    return Promise.props({
      count: Models.count({
        where: where,
        include: include
      }),
      objects: Models.findAll({
        where: where,
        include: include,
        limit: options.limit,
        offset: options.offset
      })
    })
  },
  get: (modelId, options = {}) => {
    const id = modelId
    return Models.findOne({
      where: { id: id },
      rejectOnEmpty: options.rejectOnEmpty ? options.rejectOnEmpty : false
    })
  },
  fullRes: model => {
    const output = {}
    output.id = model.id
    return Promise.props({
      brand: model.getBrand().then(res => res.name)
    }).then(result => {
      output.brand = result.brand
      output.modelTitle = model.modelTitle
      output.modelImage = model.modelImage
      output.seoText = model.seoText
      output.metaDescription = model.metaDescription
      output.titleTag = model.titleTag
      return output
    })
  }
}
