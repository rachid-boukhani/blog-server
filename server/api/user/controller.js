import {merge} from 'lodash'

import Model from './model'
import {signToken} from '../../auth/auth'

export default {
  params: (req, res, next, id) => {
    Model.findById(id).select('-password').exec().then((model) => {
      if (!model) {
        next(new Error('undefined used'))
      } else {
        req.model = model
        next()
      }
    }, next)
  },

  me: (req, res, next) => {
    res.json(req.user.toJson())
  },

  get: (req, res, next) => {
    Model.find({}).select('-password').exec().then(models => res.json(models), next)
  },
  getOne: (req, res, next) => {
    res.json(req.model.toJson())
  },
  post: (req, res, next) => {
    const newDoc = new Model(req.body)
    newDoc.save().then((saved) => {
      const token = signToken(saved._id)
      res.json({token: token})
    }, next)
  },
  put: (req, res, next) => {
    merge(req.model, req.body)
    req.model.save().then((saved) => {
      res.json(saved.toJson())
    }, next)
  },
  delete: (req, res, next) => {
    req.model.remove().then((removed) => {
      res.json(removed.toJson())
    }, next)
  }
}
