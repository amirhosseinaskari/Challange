import { NextFunction, Request, Response } from 'express'
import config from 'config'
import { verify } from 'jsonwebtoken'
import { t } from 'subscribers/i18next'
import { IUserSchema } from 'models/user'
import { Roles } from '~src/types/auth/user'

// define authentication middleware
export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token')
  if (!token)
    res.sendStatus(401).send({ message: t('errors:auth.authentication') })
  try {
    const decoded = verify(token, config.get('auth.jwt_private_key'))
    const { id } = decoded as IUserSchema
    req.body = { ...req.body, id }
    next()
  } catch (error) {
    res.sendStatus(400).send({ message: t('errors:auth.invalid_token') })
  }
}

// define seller authorization middleware
export const sellerAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token')
  if (!token)
    res.sendStatus(401).send({ message: t('errors:auth.authentication') })
  try {
    const decoded = verify(token, config.get('auth.jwt_private_key'))
    const { roles } = decoded as IUserSchema
    if (!roles.includes(Roles.SELLER))
      res.sendStatus(400).send({ message: t('errors:auth.invalid_token') })
    next()
  } catch (error) {
    res.sendStatus(400).send({ message: t('errors:auth.invalid_token') })
  }
}
