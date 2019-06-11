'use strict'

const _ = require('lodash')
const Promise = require('bluebird')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const exceptions = require('../../lib/exceptions')
const Products = require('../../models').Product
const Brand = require('../../models').Brand
const Size = require('../../models').Size

module.exports = {
  sanitize: input => {
    const errors = []
    if (!input.categories) {
      input.categories = []
    }
    if (!input.equipments) {
      input.equipments = []
    }
    if (!input.professions) {
      input.professions = []
    }
    return Products.findAll({
      where: { brandId: input.brand, sizeId: input.size }
    }).then(prod => {
      if (_.size(prod) > 0) {
        errors.push({ msg: 'Product with same Brand and Size Already Exists' })
      }
      if (!_.isEmpty(errors)) {
        return Promise.reject(new exceptions.InvalidInputError(errors))
      }

      return {
        ...input
      }
    })
  },
  create: params => {
    let newProduct = {}
    return Products.create({
      model: params.model,
      o_variant: params.oVariant,
      variant: params.variant,
      year: params.year,
      primary_image: params.primaryImage,
      thumbnail1: params.thumbnail1,
      thumbnail2: params.thumbnail2,
      thumbnail3: params.thumbnail3,
      thumbnail4: params.thumbnail4,
      short_description: params.shortDescription,
      long_description: params.longDescription,
      acquisition_cost: params.acquisitionCost,
      scrap_value: params.scrapValues,
      leasing_period: params.leasingPeriods,
      start_kilometer: params.startKilometer,
      end_kilometer: params.endKilometer,
      interval_kilometer: params.intervalKilometer,
      interval_price: params.intervalPrice
    })
      .then(prod => {
        newProduct = prod
        return Promise.all([
          newProduct.setBrand(params.brand),
          newProduct.setSize(params.size),
          newProduct.setFinance(1),
          newProduct.setColors(params.colors),
          newProduct.setCategories(params.categories),
          newProduct.setEquipments(params.equipments),
          newProduct.setProfessions(params.professions)
        ])
      })
      .then(() => newProduct)
  },
  search: options => {
    const where = {}
    const include = [
      {
        model: Brand
      },
      {
        model: Size
      }
    ]

    // Filters
    if (options.brand) {
      Object.assign(where, { brandId: { [Op.or]: options.brand } })
    }
    if (options.size) {
      Object.assign(where, { sizeId: { [Op.or]: options.size } })
    }

    return Promise.props({
      count: Products.count({
        where: where,
        include: include
      }),
      objects: Products.findAll({
        where: where,
        include: include,
        limit: options.limit,
        offset: options.offset
      })
    })
  },
  modify: (productId, params) => {
    const id = productId
    return Products.findOne({
      where: { id: id },
      rejectOnEmpty: true
    })
      .then(product =>
        Promise.props({
          productUpdate: product.update({
            model: params.model,
            o_variant: params.oVariant,
            variant: params.variant,
            year: params.year,
            primary_image: params.primaryImage,
            thumbnail1: params.thumbnail1,
            thumbnail2: params.thumbnail2,
            thumbnail3: params.thumbnail3,
            thumbnail4: params.thumbnail4,
            short_description: params.shortDescription,
            long_description: params.longDescription,
            acquisition_cost: params.acquisitionCost,
            scrap_value: params.scrapValues,
            leasing_period: params.leasingPeriods,
            start_kilometer: params.startKilometer,
            end_kilometer: params.endKilometer,
            interval_kilometer: params.intervalKilometer,
            interval_price: params.intervalPrice
          }),
          brand: product.setBrand(params.brand),
          size: product.setSize(params.size),
          colors: product.setColors(params.colors),
          categories: product.setCategories(params.categories),
          equipments: product.setEquipments(params.equipments),
          professions: product.setProfessions(params.professions)
        })
      )
      .then(result => result.productUpdate)
  },
  get: (productId, options = {}) => {
    const id = productId
    return Products.findOne({
      where: { id: id },
      rejectOnEmpty: options.rejectOnEmpty ? options.rejectOnEmpty : false
    })
  },
  delete: productId => {
    return Products.destroy({
      where: { id: productId },
      rejectOnEmpty: true
    })
  },
  fullRes: product => {
    const output = _.clone(productModel)
    output.id = product.id
    return Promise.props({
      brand: product.getBrand().then(res => res.name),
      size: product.getSize().then(res => res.name),
      finances: product.getFinance(),
      colors: product.getColors(),
      equipments: product.getEquipments(),
      categories: product.getCategories(),
      professions: product.getProfessions()
    }).then(result => {
      output.newCar = product.new_car
      output.model = product.model
      output.oVariant = product.o_variant
      output.variant = product.variant
      output.year = product.year
      output.primaryImage = product.primary_image
      output.thumbnail1 = product.thumbnail1
      output.thumbnail2 = product.thumbnail2
      output.thumbnail3 = product.thumbnail3
      output.thumbnail4 = product.thumbnail4
      output.shortDescription = product.short_description
      output.longDescription = product.long_description
      output.acquisitionCost = product.acquisition_cost
      output.scrapValues = product.scrap_value
      output.leasingPeriods = product.leasing_period
      output.startKilometer = product.start_kilometer
      output.endKilometer = product.end_kilometer
      output.intervalKilometer = product.interval_kilometer
      output.intervalPrice = product.interval_price
      output.brand = result.brand
      output.size = result.size
      output.equipments = result.equipments
      output.colors = result.colors
      output.categories = result.categories
      output.professions = result.professions
      let downpayment = result.finances.downpayment3
      if (!downpayment) {
        downpayment = result.finances.downpayment2
      }
      if (!downpayment) {
        downpayment = result.finances.downpayment1
      }
      output.downpayment = result.finances.downpayment1 || 0
      output.monthlyPrice = getMonthlyPrice(
        result.finances.rate,
        product.leasing_period[product.leasing_period.length - 1],
        product.acquisition_cost,
        product.scrap_value[product.scrap_value.length - 1],
        downpayment,
        0,
        0,
        0,
        1
      )

      return output
    })
  }
}

const productModel = {
  id: undefined,
  name: undefined,
  newCar: undefined,
  model: undefined,
  oVariant: undefined,
  variant: undefined,
  year: undefined,
  primaryImage: undefined,
  thumbnail1: undefined,
  thumbnail2: undefined,
  thumbnail3: undefined,
  thumbnail4: undefined,
  shortDescription: undefined,
  longDescription: undefined,
  acquisitionCost: undefined,
  scrapValue: undefined,
  leasingPeriod: undefined,
  startKilometer: undefined,
  endKilometer: undefined,
  intervalKilometer: undefined,
  intervalPrice: undefined,
  professionId: undefined,
  brand: undefined,
  size: undefined,
  colorId: undefined,
  categoryId: undefined,
  equipmentId: undefined,
  downpayment2: undefined,
  createdAt: undefined,
  updatedAt: undefined
}

// eslint-disable-next-line no-unused-vars
const PMT = (rate, nper, pv, fv, type) => {
  if (!fv) fv = 0
  if (!type) type = 0
  if (rate === 0) return -(pv + fv) / nper
  const pvif = Math.pow(1 + rate, nper)
  let pmt = (rate / (pvif - 1)) * -(pv * pvif + fv)
  if (type === 1) {
    pmt = pmt / (1 + rate)
  }
  return Math.ceil(pmt / 10) * 10
}

// eslint-disable-next-line no-unused-vars
const getMonthlyPrice = (
  rate, // Percentage Value: 2.75%
  leasingPeriod, // options values: 12, 24, 36, 48, 60, 72
  acquisitionCost,
  scrapValue,
  downpayment,
  colorPrice,
  equipmentPrice,
  professionPrice,
  type = 1
) => {
  const decimalRate = rate / 100
  const calculatedAcquisitionCost =
    acquisitionCost -
    downpayment -
    colorPrice -
    equipmentPrice -
    professionPrice
  const monthlyPrice = PMT(
    decimalRate / 12,
    leasingPeriod,
    -calculatedAcquisitionCost,
    scrapValue,
    type
  )
  return Math.ceil(monthlyPrice / 10) * 10
}
