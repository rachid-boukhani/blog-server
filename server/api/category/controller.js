import {merge} from 'lodash'
import Model from './model'

export default {
  params: (req, res, next, id) => {
    Model.findById(id).then((model) => {
      if (!model) {
        next(new Error('undefined used'))
      } else {
        req.model = model
        next()
      }
    }, next)
  },

  get: (req, res, next) => {
    Model.find({})
      .then(models => res.json(models), next)
  },
  getOne: (req, res, next) => {
    res.json(req.model)
  },
  post: (req, res, next) => {
    const newDoc = new Model(req.body)
    newDoc.save().then((saved) => {
      res.json(saved)
    }, next)
  },
  put: (req, res, next) => {
    merge(req.model, req.body)
    req.model.save().then((saved) => {
      res.json(saved)
    }, next)
  },
  delete: (req, res, next) => {
    req.model.remove().then((removed) => {
      res.json(removed)
    }, next)
  }
}
