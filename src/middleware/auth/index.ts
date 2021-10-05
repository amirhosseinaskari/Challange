import {NextFunction, Request, Response} from 'express'
import config from 'config'
import {verify} from 'jsonwebtoken'
import {t} from 'subscribers/i18next'
import {IUserSchema} from 'models/user'

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token')
  if (!token) res.status(401).send({message: t('errors:auth.authentication')})
  try {
    const decoded = verify(token, config.get('auth.jwt_private_key'))
    const {_id, status} = decoded as IUserSchema
    req.body = {...req.body, id: _id, status}
    next()
  } catch (error) {
    res.status(400).send({message: t('auth.invalid_token')})
  }
}
