import { Express } from 'express'
import { ADMIN_PRODUCTS } from 'endpoints/admin'
import productsRouter from '@api/products'
import { LOGIN, REGISTER } from '~src/endpoints/auth'
import registerRouter from '@api/auth/register'
import loginRouter from '@api/auth/login'
import profileRouter from '@api/profile'
import { PROFILE } from '~src/endpoints/profile'

export const routes = (app: Express) => {
  // Admin Routes
  app.use(ADMIN_PRODUCTS, productsRouter) // path: /api/v1/admin/products

  // Authentication Routes
  app.use(REGISTER, registerRouter) // path: /api/v1/register
  app.use(LOGIN, loginRouter) // path: /api/v1/login

  // Profile Routes
  app.use(PROFILE, profileRouter)
}
