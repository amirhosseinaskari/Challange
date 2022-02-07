import express from 'express'
import { addBuy } from './buy'
import { addDeposit } from './deposit'
import { addSell } from './sell'
const router = express.Router()

addBuy(router)

addSell(router)

addDeposit(router)

export default router
