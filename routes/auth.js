import { Router } from "express"
import { login, loginForm, register } from "../controller/auth.js"

const auth = Router()
auth.get('/login', loginForm)
auth.post('/login', login)

auth.post('/register', register)

export default auth