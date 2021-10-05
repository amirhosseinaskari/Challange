import { Express } from 'express'
import { ADMIN_PRODUCTS } from 'endpoints/admin'
import productsRouter from '@api/products'
import { REGISTER_USER } from '~src/endpoints/auth'
import userRouter from '@api/auth/register'

export const routes = (app: Express) => {
  //====Admin Routes====
  app.use(ADMIN_PRODUCTS, productsRouter) // path: ./admin/products

  //====Authentication Routes====
  app.use(REGISTER_USER, userRouter) // path: ./register
}
