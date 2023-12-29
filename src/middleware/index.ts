import express from 'express'
import { get, merge } from 'lodash'
import jwt from 'jsonwebtoken'

// import { getUserBySessionToken } from '../db/user'

const jwt_secret = 'karn-tong-api'

interface JwtPayload{
    email: string
    userId: string
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params
        const currentUserId = get(req, 'identity._id') as string
        // console.log(id)
        // console.log(currentUserId)

        if(!currentUserId){
            return res.sendStatus(403)
        }

        if(currentUserId.toString() !== id){
            return res.sendStatus(403)
        }
        
        next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const isAuthenticated = async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Token missing' });
    }

    try {
        const decode = jwt.verify(token, jwt_secret) as JwtPayload
        return next()
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' })
    }
}

// export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction ) => {
//     try {
//         const sessionToken = req.cookies['ANTONIO-AUTH']

//         if(! sessionToken ){
//             return res.sendStatus(403)
//         }

//         const existingUser = await getUserBySessionToken(sessionToken)

//         if (!existingUser){
//             return res.sendStatus(403)
//         }

//         merge(req, { identity: existingUser })

//         return next()
//     } catch (error) {
//         console.log(error)
//         return res.sendStatus(400)
//     }
// }