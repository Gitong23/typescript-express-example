import express from 'express'
import { deleteUser, getAllUsers, updateUser } from '../controller/user'
import { isAuthenticated, isOwner } from '../middleware'

export default (router: express.Router) => {
    router.get('/user', isAuthenticated, getAllUsers)
    router.delete('/user/:id', isAuthenticated,isOwner, deleteUser)
    router.patch('/user/:id', isAuthenticated, isOwner,updateUser)
}

