import express from 'express'
import _ from 'lodash'
import { register } from './submit'
import { verifyPhone } from './verify_phone'
import { sendCode } from './send_code'

const router = express.Router()

// submit user information
register(router)

// verify phone
verifyPhone(router)

// send verification code
sendCode(router)

export default router
