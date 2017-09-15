import {Router} from 'express'
import controller from './controller'

const router = Router()

router.param('id', controller.params)

router.route('/')
  .get(controller.get)
  .post(controller.post)

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

export default router
