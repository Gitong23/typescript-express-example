import express from 'express'
import User from '../model/User'
import { string, z } from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});

const userLoginSchema = z.object({
    email: z.string(),
    password: z.string()
})

const jwt_secret = 'karn-tong-api'

export const register =  async (req: express.Request<{}, {}, {
    username: string,
    email: string,
    password: string
}>, res: express.Response) => {
    try {
        const validateRequest = userSchema.parse(req.body)

        //check not duplicate email
        const findEmail = await User.findOne({where: {email: req.body.email}})

        if(findEmail){
            res.status(401).json({error: "Invalid Duplicate Email"})
        }

        const newUser = await User.create(
            req.body
        )
        return res.status(200).json(newUser)
    } catch (error) {
        console.log("Validation error:", error.errors)
        return res.status(400).json({error: "Invalid request body"})
    }
}

export const login = async (req: express.Request<{}, {}, {
    email: string,
    password: string
}>, res: express.Response) =>{

    try {
        const validReq = userLoginSchema.safeParse(req.body) 
        if(!validReq.success) return res.status(400).json({error: 'Invalid Request'})

        const findUser = await User.findOne({where: {email: req.body.email}})
        
        if(!findUser ) return res.status(401).json({error: 'Not Found User Name'})

        const matchPassword = await bcrypt.compare(req.body.password, findUser.password)
        if(!matchPassword) return res.status(401).json({error: 'Wrong Password'})

        const { id , email } = findUser

        //return token
        const accessToken = jwt.sign({email: email, userId: id}, jwt_secret, { expiresIn: '1h' })

        res.status(200).json({
            email: email,
            userId: id,
            accessToken: accessToken
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Intenal Server Error"})
    }
}
