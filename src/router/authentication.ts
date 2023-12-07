import express from 'express'
import { login, register } from '../controller/authentication'

const router = express.Router()

export default (router: express.Router) => {
    router.post('/auth/register', register)
    router.post('/auth/login', login)
}