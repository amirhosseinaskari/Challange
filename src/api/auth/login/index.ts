import express from 'express'
import { submit } from './submit'

const router = express.Router()

// submit login
submit(router)

export default router
