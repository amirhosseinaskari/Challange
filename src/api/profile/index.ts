import express from 'express'
import { changePassword } from './change_password'

const router = express.Router()

// eidt password of user from profile page
changePassword(router)

export default router
