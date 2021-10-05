import express, {Response, Request} from 'express'
import {userValidator} from 'services/auth/validators'
import {t} from 'subscribers/i18next'
import {ILogin, UniqueItem} from '~types/auth/user'
import {compare} from 'bcrypt'
import {findUser} from '~utils/findeUser'

const router = express.Router()

router.post('/login', async (req: Request, res: Response) => {
  const {
    phone,
    password,
    email,
    name,
    unique_item = UniqueItem.PHONE,
    item = phone,
  } = req.body as ILogin

  // validate phone and password
  const error = await userValidator({phone, password, email, name})
  if (error) return res.status(400).send({validator_error: error})

  // if unique item is not defined
  if (!item)
    return res.status(400).send({message: t('errors: auth.bad_request')})

  // check does user exist
  const user = await findUser(unique_item, item)
  if (!user) return res.status(400).send({message: t('errors:auth.login')})

  // check password
  const is_valid_password = await compare(password, user.password)
  if (!is_valid_password)
    return res.status(400).send({message: t('errors:auth.login')})

  const token = await user.generateAuthToken()
  res.send({token})
})
