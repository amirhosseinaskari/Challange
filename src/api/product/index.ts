import express from 'express'
import { addProduct } from './addProduct'
import { deleteProduct } from './deleteProduct'
import { editProduct } from './editProduct'
import { getMyproducts, getProducts } from './getProduct'
const router = express.Router()

addProduct(router)

editProduct(router)

deleteProduct(router)

getProducts(router)

getMyproducts(router)

export default router
