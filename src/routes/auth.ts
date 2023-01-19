import { Router } from 'express'
import { SignUp, SignIn, UserCheck } from '../controllers/auth'

const router = Router()

router.post('/signup', SignUp)
router.post('/signin', SignIn)
router.get('/check/:user', UserCheck)

export default router
