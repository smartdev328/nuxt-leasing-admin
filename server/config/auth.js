'use strict'

const jwt = require('jsonwebtoken')

const issuer = 'leasingadmin'
const sharedSecret = 'jsonwebtokensharedkey'

exports.verifyToken = function (req, authOrSecDef, token, callback) {
  // these are the scopes/roles defined for the current endpoint
  // const currentScopes = req.swagger.operation['x-security-scopes']
  // const currentScopes = []

  function sendError() {
    return req.res.status(403).json({ message: 'Access Denied' })
  }

  // validate the 'Authorization' header. it should have the following format:
  // 'Bearer tokenString'
  if (token && token.indexOf('Bearer ') === 0) {
    const tokenString = token.split(' ')[1]
    jwt.verify(tokenString, sharedSecret, function (verificationError, decodedToken) {
      // check if the JWT was verified correctly
      if (verificationError === null) {
        // check if the role is valid for this endpoint
        // const roleMatch = currentScopes.indexOf(decodedToken.role) !== -1
        // check if the issuer matches
        // const issuerMatch = decodedToken.iss === issuer
        const expireMatch = new Date().getTime() < decodedToken.exp * 1000

        // if (roleMatch && issuerMatch) {
        if (expireMatch) {
          req.auth = decodedToken
          // if there is no error, just return null in the callback
          return callback(null)
        } else {
          // return the error in the callback if there is one
          return callback(sendError())
        }
      } else {
        // return the error in the callback if the JWT was not verified
        return callback(sendError())
      }
    })
  } else {
    // return the error in the callback if the Authorization header doesn't have the correct format
    return callback(sendError())
  }
}

exports.issueToken = function (username) {
  const token = jwt.sign({
    sub: username,
    iss: issuer
  }, sharedSecret, {
    expiresIn: '60s'
  })
  return token
}
