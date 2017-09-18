import {Router} from 'express'
import controller from './controller'
import {checkToken, getCurrentUser} from '../../auth/auth'

const checkUser = [checkToken, getCurrentUser]

const router = Router()

router.param('id', controller.params)
router.get('/me', checkUser, controller.me)

router.route('/')
  .get(controller.get)
  .post(controller.post)

router.route('/:id')
  .get(controller.getOne)
  .put(checkUser, controller.put)
  .delete(checkUser, controller.delete)

export default router
