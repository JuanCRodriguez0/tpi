import { Router } from "express"
import { login, loginForm, register, registerForm, logout } from "../controller/auth.js"

const router = Router()

router.get('/', loginForm)
router.get('/login', loginForm)
router.post('/login', login)

router.get('/register', registerForm)
router.post('/register', register)

router.post('/logout', logout);

export default router