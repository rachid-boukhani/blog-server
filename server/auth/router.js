import {Router} from 'express'
import controller from './controller'
import {checkCredentials} from './auth'

const router = Router()

router.post('/signin', checkCredentials, controller.signin)

export default router
