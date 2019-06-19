'use strict'

const _ = require('lodash')
const Promise = require('bluebird')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Products = require('../../models').Product
const Brands = require('../../models').Brand
const getMonthlyPrice = require('../../lib/pmt')

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
      fuel_type: params.fuelType,
      doors: params.doors,
      motor: params.motor,
      cargoSize: params.cargoSize,
      gear: params.gear,
      energyLabel: params.energyLabel
    })
      .then(prod => {
        newProduct = prod
        return Promise.all([
          newProduct.setModel(params.model),
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
    const include = []

    // Filters
    if (options.model) {
      Object.assign(where, { modelId: { [Op.or]: options.model } })
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
            fuel_type: params.fuelType,
            doors: params.doors,
            motor: params.motor,
            cargoSize: params.cargoSize,
            gear: params.gear,
            energyLabel: params.energyLabel
          }),
          model: product.setModel(params.model),
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
      model: product.getModel().then(res => ({ name: res.modelTitle, brand: res.brandId })),
      size: product.getSize().then(res => res.name),
      finances: product.getFinance(),
      colors: product.getColors(),
      equipments: product.getEquipments(),
      categories: product.getCategories(),
      professions: product.getProfessions()
    }).then(result => {
      output.newCar = product.new_car
      output.model = result.model.name
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

      return Brands.findOne({ where: { id: result.model.brand } })
    })
      .then((brand) => {
        output.brand = brand.name
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
  createdAt: undefined,
  updatedAt: undefined
}
