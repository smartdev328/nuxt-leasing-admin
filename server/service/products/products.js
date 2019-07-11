'use strict'

const _ = require('lodash')
const Promise = require('bluebird')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Products = require('../../models').Product
const Brands = require('../../models').Brand

module.exports = {
  sanitize: input => {
    if (!input.categories) {
      input.categories = []
    }
    if (!input.equipments) {
      input.equipments = []
    }
    if (!input.professions) {
      input.professions = []
    }
    return new Promise(resolve => resolve({
      ...input
    }))
  },
  create: params => {
    let newProduct = {}
    return Products.create({
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
      interval_price: params.intervalPrice,
      economy: params.economy,
      fuelType: params.fuelType,
      doors: params.doors,
      motor: params.motor,
      cargoSize: params.cargoSize,
      gear: params.gear,
      energyLabel: params.energyLabel,
      status: params.status
    })
      .then(prod => {
        newProduct = prod
        const promises = []
        if (params.model) {
          promises.push(newProduct.setModel(params.model))
        }
        if (params.size) {
          promises.push(newProduct.setSize(params.size))
        }
        if (params.colors && params.colors.length > 0) {
          promises.push(newProduct.setColors(params.colors))
        }
        promises.push(newProduct.setFinance(1))
        promises.push(newProduct.setCategories(params.categories))
        promises.push(newProduct.setEquipments(params.equipments))
        promises.push(newProduct.setProfessions(params.professions))
        return Promise.all(promises)
      })
      .then(() => newProduct)
  },
  search: options => {
    const condition = {}
    const include = []

    // Filters
    if (options.model) {
      Object.assign(condition, { modelId: { [Op.in]: options.model } })
    }
    if (options.oVariant) {
      Object.assign(condition, { o_variant: { [Op.like]: `%${options.oVariant}%` } })
    }
    if (options.acquisitionCost) {
      Object.assign(condition, { acquisition_cost: { [Op.between]: options.acquisitionCost } })
    }
    if (options.year) {
      Object.assign(condition, { year: { [Op.between]: options.year } })
    }
    if (options.status) {
      Object.assign(condition, { status: { [Op.in]: options.status } })
    }
    let where = {}
    if (!_.isEmpty(condition)) {
      where = {
        [Op.and]: condition
      }
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
        offset: options.offset,
        order: [
          ['id', 'ASC']
        ]
      })
    })
  },
  modify: (productId, params) => {
    const id = productId
    let updatedProd = {}
    return Products.findOne({
      where: { id: id },
      rejectOnEmpty: true
    })
      .then(product => product.update({
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
        interval_price: params.intervalPrice,
        economy: params.economy,
        fuelType: params.fuelType,
        doors: params.doors,
        motor: params.motor,
        cargoSize: params.cargoSize,
        gear: params.gear,
        energyLabel: params.energyLabel,
        status: params.status
      }))
      .then(prod => {
        const promises = []
        updatedProd = prod
        if (params.model) {
          promises.push(prod.setModel(params.model))
        }
        if (params.size) {
          promises.push(prod.setSize(params.size))
        }
        if (params.colors) {
          promises.push(prod.setColors(params.colors))
        }
        promises.push(prod.setFinance(1))
        promises.push(prod.setCategories(params.categories))
        promises.push(prod.setEquipments(params.equipments))
        promises.push(prod.setProfessions(params.professions))
        return Promise.all(promises)
      })
      .then(() => updatedProd)
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
      model: product.getModel().then(res => res ? ({ name: res.modelTitle, brand: res.brandId }) : undefined),
      size: product.getSize().then(res => res && res.name),
      colors: product.getColors().then(res => res.map(item => item.id)),
      equipments: product.getEquipments().then(res => res.map(item => item.id)),
      categories: product.getCategories().then(res => res.map(item => item.id)),
      professions: product.getProfessions().then(res => res.map(item => item.id))
    }).then(result => {
      output.newCar = product.new_car
      output.model = result.model && result.model.name
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
      output.size = result.size
      output.equipments = result.equipments
      output.colors = result.colors
      output.categories = result.categories
      output.professions = result.professions
      output.economy = product.economy
      output.fuelType = product.fuelType
      output.doors = product.doors
      output.motor = product.motor
      output.cargoSize = product.cargoSize
      output.gear = product.gear
      output.energyLabel = product.energyLabel
      output.status = product.status
      if (result.model) {
        return Brands.findOne({ where: { id: result.model.brand } })
      }
    })
      .then((brand) => {
        if (brand) {
          output.brand = brand.name
        }
        return output
      })
  },
  fullResForOne: product => {
    const output = _.clone(productModel)
    output.id = product.id
    return Promise.props({
      model: product.getModel().then(res => res ? ({ id: res.id, brand: res.brandId }) : undefined),
      size: product.getSize().then(res => res && res.id),
      colors: product.getColors().then(res => res.map(item => item.id)),
      equipments: product.getEquipments().then(res => res.map(item => item.id)),
      categories: product.getCategories().then(res => res.map(item => item.id)),
      professions: product.getProfessions().then(res => res.map(item => item.id))
    }).then(result => {
      output.newCar = product.new_car
      if (result.model) {
        output.model = result.model.id
        output.brand = result.model.brand
      }
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
      output.size = result.size
      output.equipments = result.equipments
      output.colors = result.colors
      output.categories = result.categories
      output.professions = result.professions
      output.economy = product.economy
      output.fuelType = product.fuelType
      output.doors = product.doors
      output.motor = product.motor
      output.cargoSize = product.cargoSize
      output.gear = product.gear
      output.energyLabel = product.energyLabel
      output.status = product.status
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
  downpayment: undefined,
  monthlyPrice: undefined,
  economy: undefined,
  fuelType: undefined,
  doors: undefined,
  motor: undefined,
  cargoSize: undefined,
  gear: undefined,
  energyLabel: undefined,
  status: undefined,
  createdAt: undefined,
  updatedAt: undefined
}
