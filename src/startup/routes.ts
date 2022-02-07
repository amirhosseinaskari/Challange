import { Express } from 'express'
import productsRouter from '~src/api/payment'
import { LOGIN, REGISTER } from '~src/endpoints/auth'
import registerRouter from '@api/auth/register'
import loginRouter from '@api/auth/login'
import profileRouter from '@api/profile'
import { PROFILE } from '~src/endpoints/profile'
import { PRODUCTS } from '~src/endpoints/products'

export const routes = (app: Express) => {
  // products Routes
  app.use(PRODUCTS, productsRouter) // path: /api/v1/products

  // Authentication Routes
  app.use(REGISTER, registerRouter) // path: /api/v1/register
  app.use(LOGIN, loginRouter) // path: /api/v1/login

  // Profile Routes
  app.use(PROFILE, profileRouter)
}
