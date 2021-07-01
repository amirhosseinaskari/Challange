import express, {Response, Request} from 'express'
import {User} from 'models/user'
import _ from 'lodash'
import {userValidator} from 'services/auth/validators'
import {t} from 'subscribers/i18next'
import {IUser, Roles, UserStatus} from '~types/auth/user'
import {hashPass} from '~utils/hash'

const router = express.Router()

// register a user
router.post('/register', async (req: Request, res: Response) => {
  const {phone, name, password, email} = req.body
  const error = await userValidator(req.body as IUser)
  if (error) res.status(400).send(error)

  // find user in db
  let user = await User.findOne({phone})

  // send error if user is registered before (is found in db)
  if (user) return res.status(400).send(t('errors:auth.user_registered'))

  // hash password
  const hashed_password = await hashPass(password)

  // create new user model by inputs
  user = new User({
    name,
    phone,
    password: hashed_password,
    email,
    roles: [Roles.PUBLIC],
    registerDate: new Date(),
    status: UserStatus.PHONE_UNVERIFIED,
  })
  // save user to db
  await user.save()
  const token = user.generateAuthToken()
  return res.status(200).header('x-auth-token', token).send({
    name,
    phone,
    email,
  })
})

export default router
