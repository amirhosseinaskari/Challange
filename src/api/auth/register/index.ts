import express from 'express'
import _ from 'lodash'
import { registerBuyer, registerSeller } from './submit'

const router = express.Router()

// register buyer
registerBuyer(router)

// register seller
registerSeller(router)

export default router
