import express from 'express'
import { editPassword } from './change_password'
import { editInfo } from './edit_info'

const router = express.Router()

// eidt name of user
editInfo(router)

// eidt password of user from profile page
editPassword(router)

export default router
