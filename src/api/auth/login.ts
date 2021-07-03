import express, {Response, Request} from 'express'
import {User} from 'models/user'
import {loginValidator} from 'services/auth/validators'
import {t} from 'subscribers/i18next'
import {ILogin, IUser, UserStatus} from '~types/auth/user'
import {compare} from 'bcrypt'

const router = express.Router()

router.post('/login', async (req: Request, res: Response) => {
  const {phone, password} = req.body as ILogin

  // validate phone and password
  const error = await loginValidator({phone, password})
  if (error) return res.status(400).send({validator_error: error})

  // check is user exist
  const user = await User.findOne({phone})
  if (!user) return res.status(400).send({message: t('errors:auth.login')})

  // check password
  const is_valid_password = await compare(password, user.password)
  if (!is_valid_password)
    return res.status(400).send({message: t('errors:auth.login')})

  // check his/her phone is verified
  const is_phone_verified = user.status === UserStatus.PHONE_VERIFIED
  if (!is_phone_verified)
    return res.status(403).send({message: t('errors: auth.phone_verify')})

  const token = await user.generateAuthToken()
  res.send(token)
})
