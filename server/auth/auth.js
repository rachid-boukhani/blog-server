import {sign} from 'jsonwebtoken'
import expressJwt from 'express-jwt'

import config from '../config'
import userModel from '../api/user/model'

export const checkCredentials = (req, res, next) => {
  const {username, password} = req.body
  if (!username || !password) {
    res.status(400).send('username and password is required')
  } else {
    userModel.findOne({username}).then((user) => {
      if (!user) {
        res.status(401).send('the user is not registered')
      } else {
        // Check password
        user.authenticate(password).then((match) => {
          if (!match) {
            res.status(401).send('invalid password')
          } else {
            req.user = user
            next()
          }
        }, next)
      }
    }, next)
  }
}

export const signToken = (id) => {
  return sign(
    {_id: id},
    config.secrets.jwt,
    {expiresIn: config.secrets.expireTime}
  )
}

// this will call next if token is valid and send error if its not.
// It will attached the decoded token to req.user
export const checkToken = expressJwt({ secret: config.secrets.jwt })

export const getCurrentUser = (req, res, next) => {
  userModel.findById(req.user._id).then((user) => {
    if (!user) {
      res.status(401).send('Unauthorized');
    } else {
      req.user = user
      next()
    }
  }, next)
}
