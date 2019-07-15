'use strict'

const _ = require('lodash')
const Promise = require('bluebird')
const Sequelize = require('sequelize')
const Orders = require('../../models').Order
const Op = Sequelize.Op

module.exports = {
  create: params => {
    if (!params.address) {
      params.address = {}
    }
    return Orders.create({
      brand: params.brand,
      model: params.model,
      variant: params.variant,
      leasingPeriod: params.leasingPeriod,
      kilometers: params.kilometers,
      color: params.color,
      primaryImage: params.primaryImage,
      profession: params.profession,
      equipment: params.equipment,
      downPayment: params.downPayment,
      monthlyPrice: params.monthlyPrice,
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      phone: params.phone,
      companyName: params.companyName,
      cvr: params.cvr,
      numberOfEmployees: params.numberOfEmployees,
      companyIndustry: params.companyIndustry,
      urgency: params.urgency,
      urgencyFlexibility: params.urgencyFlexibility,
      addressStreet: params.address.street,
      addressZipcode: params.address.zipcode,
      addressCity: params.address.city,
      addressFloor: params.address.floor,
      newsletter: params.newsletter,
      message: params.message
    })
  },
  search: options => {
    const condition = {}
    const include = []

    // Filters
    if (options.model) {
      Object.assign(condition, { model: { [Op.in]: options.model } })
    }
    if (options.color) {
      Object.assign(condition, { color: { name: { [Op.any]: options.color } } })
    }
    if (options.username) {
      const names = options.username.split(' ')
      Object.assign(condition, { firstName: { [Op.like]: `%${names[0]}%` } })
      if (names[1]) Object.assign(condition, { lastName: { [Op.like]: `%${names[1]}%` } })
    }
    if (options.email) {
      Object.assign(condition, { email: { [Op.like]: `%${options.email}%` } })
    }
    if (options.variant) {
      Object.assign(condition, { variant: { [Op.like]: `%${options.variant}%` } })
    }
    if (options.companyName) {
      Object.assign(condition, { companyName: { [Op.like]: `%${options.companyName}%` } })
    }
    if (options.cvr) {
      Object.assign(condition, { cvr: { [Op.like]: `%${options.cvr}%` } })
    }
    if (options.companyIndustry) {
      Object.assign(condition, { companyIndustry: { [Op.in]: options.companyIndustry } })
    }
    if (options.numberOfEmployees) {
      Object.assign(condition, { numberOfEmployees: { [Op.in]: options.numberOfEmployees } })
    }
    if (options.monthlyPrice) {
      Object.assign(condition, { monthlyPrice: { [Op.between]: options.monthlyPrice } })
    }
    if (options.status) {
      Object.assign(condition, { status: { [Op.in]: options.status } })
    } else {
      Object.assign(condition, { status: { [Op.ne]: 'TEMP_CREATED' } })
    }
    let where = {}
    if (!_.isEmpty(condition)) {
      where = {
        [Op.and]: condition
      }
    }

    return Promise.props({
      count: Orders.count({
        where: where,
        include: include
      }),
      objects: Orders.findAll({
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
  get: (orderId, options = {}) => {
    const id = orderId
    return Orders.findOne({
      where: { id: id },
      rejectOnEmpty: options.rejectOnEmpty ? options.rejectOnEmpty : false
    })
  },
  delete: orderId => {
    return Orders.destroy({
      where: { id: orderId },
      rejectOnEmpty: true
    })
  },
  modify: (orderId, params) => {
    const id = orderId
    if (!params.address) {
      params.address = {}
    }
    return Orders.findOne({
      where: { id: id },
      rejectOnEmpty: true
    })
      .then(order => order.update({
        primaryImage: params.primaryImage,
        brand: params.brand,
        model: params.model,
        variant: params.variant,
        leasingPeriod: params.leasingPeriod,
        kilometers: params.kilometers,
        color: params.color,
        profession: params.profession,
        equipment: params.equipment,
        downPayment: params.downPayment,
        monthlyPrice: params.monthlyPrice,
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        phone: params.phone,
        companyName: params.companyName,
        cvr: params.cvr,
        numberOfEmployees: params.numberOfEmployees,
        companyIndustry: params.companyIndustry,
        urgency: params.urgency,
        urgencyFlexibility: params.urgencyFlexibility,
        addressStreet: params.address.street,
        addressZipcode: params.address.zipcode,
        addressCity: params.address.city,
        addressFloor: params.address.floor,
        newsletter: params.newsletter,
        message: params.message,
        status: params.status,
        comments: params.comments
      }))
  },
  fullRes: order => {
    const output = {}
    output.id = order.id
    return new Promise(resolve => {
      output.primaryImage = order.primaryImage
      output.brand = order.brand
      output.model = order.model
      output.variant = order.variant
      output.leasingPeriod = order.leasingPeriod
      output.kilometers = order.kilometers
      output.color = order.color
      output.profession = order.profession
      output.equipment = order.equipment
      output.downPayment = order.downPayment
      output.monthlyPrice = order.monthlyPrice
      output.firstName = order.firstName
      output.lastName = order.lastName
      output.email = order.email
      output.phone = order.phone
      output.companyName = order.companyName
      output.numberOfEmployees = order.numberOfEmployees
      output.companyIndustry = order.companyIndustry
      output.cvr = order.cvr
      output.address = {}
      output.address.street = order.addressStreet
      output.address.zipcode = order.addressZipcode
      output.address.city = order.addressCity
      output.address.floor = order.addressFloor
      output.newsletter = order.newsletter
      output.message = order.message
      output.status = order.status
      output.comments = order.comments
      output.urgency = order.urgency
      output.urgencyFlexibility = order.urgencyFlexibility
      return resolve(output)
    })
  }
}
