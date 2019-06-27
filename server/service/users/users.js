'use strict'

const Promise = require('bluebird')
const Users = require('../../models').User
const authConfig = require('../../config/auth')

module.exports = {
  create: params => {
    return Users.create({
      username: params.username,
      email: params.email,
      password: params.password
    })
  },
  search: options => {
    const where = {}
    const include = []

    return Promise.props({
      count: Users.count({
        where: where,
        include: include
      }),
      objects: Users.findAll({
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
  modify: (userId, params) => {
    const id = userId
    return Users.findOne({
      where: { id: id },
      rejectOnEmpty: true
    })
      .then(user =>
        Promise.props({
          userUpdate: user.update({
            username: params.username,
            email: params.email,
            password: params.password
          })
        })
      )
      .then(result => result.userUpdate)
  },
  get: (userId, options = {}) => {
    const id = userId
    return Users.findOne({
      where: { id: id },
      rejectOnEmpty: options.rejectOnEmpty ? options.rejectOnEmpty : false
    })
  },
  delete: userId => {
    return Users.destroy({
      where: { id: userId },
      rejectOnEmpty: true
    })
  },
  fullRes: user => {
    const output = {}
    output.id = user.id
    output.username = user.username
    output.email = user.email
    output.createdAt = user.createdAt
    output.updatedAt = user.updatedAt
    return new Promise(resolve => resolve(output))
  },
  fullResWithToken: user => {
    const output = {}
    output.user = {}
    output.user.username = user.username
    output.user.email = user.email
    const token = authConfig.issueToken(user.username)
    output.token = token
    return new Promise(resolve => resolve(output))
  },
  authenticate: (params) => {
    return Users.findOne({
      where: { username: params.username, password: params.password },
      rejectOnEmpty: true
    })
  }
}
