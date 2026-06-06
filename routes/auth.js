import { Router } from "express"
import { login, loginForm, register, registerForm } from "../controller/auth.js"

const auth = Router()

auth.get('/', loginForm)
auth.get('/login', loginForm)
auth.post('/login', login)

auth.get('/register', registerForm)
auth.post('/register', register)

export default auth