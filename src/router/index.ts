import express from 'express'

import user from './user'
import authentication from './authentication'

const router = express.Router()

export default (): express.Router => {
    authentication(router)
    user(router)
    
    return router
}