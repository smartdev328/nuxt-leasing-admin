'use strict'

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
      numberOfEmployees: params.numberOfEmployees,
      companyIndustry: params.companyIndustry,
      cvr: params.cvr,
      addressStreet: params.address.street,
      addressZipcode: params.address.zipcode,
      addressCity: params.address.city,
      newsletter: params.newsletter,
      message: params.message,
      urgency: params.urgency,
      urgencyFlexibility: params.urgencyFlexibility
    })
  },
  search: options => {
    const where = {
      status: { [Op.ne]: 'TEMP_CREATED' }
    }
    const include = []

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
        numberOfEmployees: params.numberOfEmployees,
        companyIndustry: params.companyIndustry,
        cvr: params.cvr,
        addressStreet: params.address.street,
        addressZipcode: params.address.zipcode,
        addressCity: params.address.city,
        newsletter: params.newsletter,
        message: params.message,
        status: params.status,
        comments: params.comments,
        urgency: params.urgency,
        urgencyFlexibility: params.urgencyFlexibility
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
      output.comments = order.comments
      output.companyName = order.companyName
      output.numberOfEmployees = order.numberOfEmployees
      output.companyIndustry = order.companyIndustry
      output.cvr = order.cvr
      output.address = {}
      output.address.street = order.addressStreet
      output.address.zipcode = order.addressZipcode
      output.address.city = order.addressCity
      output.newsletter = order.newsletter
      output.message = order.message
      output.status = order.status
      output.urgency = order.urgency
      output.urgencyFlexibility = order.urgencyFlexibility
      return resolve(output)
    })
  }
}
