import { Router } from 'express'
import { Darshboard } from '../controllers/private'
import { protect } from '../middlewares/private'

const router = Router()

router.get('/graphinfo', protect, Darshboard)

export default router
