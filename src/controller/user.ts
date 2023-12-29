import express, { Request, Response } from 'express'
import User from '../model/User'
import { z } from "zod"

const userSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});

export const addNewUser = async (req: express.Request<{}, {}, {
    username: string,
    email: string,
    password: string
}>, res: express.Response) => {
    try {
        const validateRequest = userSchema.parse(req.body)
        // console.log(validateRequest)
        const newUser = await User.create(req.body)
        return res.status(200).json(newUser)
    } catch (error) {
        console.log("Validation error:", error.errors)
        return res.sendStatus(400).json({error: "Invalid request body"})
    }
}

export const getSomeData = async(req: Request, res: Response) =>{
    return res.status(200).json({ data: '55555'})
}


// export const getAllUsers = async (req: express.Request, res: express.Response ) => {
//     try {
//         const user = await getUser()
//         return res.status(200).json(user)
//     } catch (error) {
//         console.log(error)
//         return res.sendStatus(400)
//     }
// }

// export const deleteUser = async (req: express.Request, res: express.Response) => {
//     try {
//         const { id } = req.params
//         const deletedUser = await deleteUserById(id)

//         return res.sendStatus(200).json(deletedUser)
//     } catch (error) { 
//         console.log(error)
//         return res.sendStatus(400)
//     }
// }

// export const updateUser = async (req: express.Request, res: express.Response) => {
//     try {
//         const { id } = req.params
//         const { username } = req.body

//         if(!username){
//             return res.sendStatus(400)
//         }

//         const user = await getUserById(id)

//         user.username = username
//         await user.save()

//         return res.sendStatus(200).json(user).end()
//     } catch (error) {
//         console.log(error)
//         return res.sendStatus(400) 
//     }
// }