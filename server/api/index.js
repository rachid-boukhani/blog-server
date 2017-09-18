import {Router} from 'express'
import userRouter from './user/router'
import postRouter from './post/router'
import categoryRouter from './category/router'

const router = Router()

router.use('/users', userRouter)
router.use('/posts', postRouter)
router.use('/categories', categoryRouter)

export default router
