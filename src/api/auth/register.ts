import express, { Response, Request } from 'express'
import { User } from 'models/user'
import _ from 'lodash'
import { userValidator } from 'services/auth/validators'
import { t } from 'subscribers/i18next'
import { IUser, Roles, UniqueItem, UserStatus } from '~types/auth/user'
import { hashPass } from '~utils/hash'
import { findUser } from '~utils/findeUser'
import { sendVerificationCode } from 'services/sms'
import { auth } from '~src/middleware/auth'
import { startupDebugger } from '~src/startup/debuggers'

const router = express.Router()

// register a user
router.post('/register', async (req: Request, res: Response) => {
  const {
    phone,
    name,
    password,
    email,
    unique_item = UniqueItem.PHONE,
    item = phone,
  } = req.body

  const error = await userValidator(req.body as IUser)
  if (error) return res.status(400).send({ validator_error: error })

  // if unique item is not defined
  if (!item)
    return res.status(400).send({ message: t('errors:auth.bad_request') })

  // is user registered before (check based on unique item)
  let user = await findUser(unique_item, item)

  // send error if user is registered before (is found in db)
  if (user)
    return res.status(400).send({ message: t('errors:auth.user_registered') })

  // hash password
  const hashed_password = await hashPass(password)

  // create new user model by inputs
  user = new User({
    name,
    phone,
    password: hashed_password,
    email,
    roles: [Roles.PUBLIC],
    register_date: new Date(),
    status: UserStatus.PHONE_UNVERIFIED,
  })

  // save user to db
  await user.save()
  return res.status(200).send({
    id: user.id,
  })
})

// it's secure
router.post('/verifyPhone', auth, async (req: Request, res: Response) => {
  const { id, status } = req.body
  const user = await User.findById(id)

  // if user not found
  if (!user)
    return res.status(401).send({ message: t('errors:auth.authentication') })

  // if user status is phone verified
  if (status === UserStatus.PHONE_VERIFIED)
    return res.status(400).send({
      message: t('errors:sms.phone_verified_before'),
      phone_verified: true,
    })

  // if user.phone doesn't exist
  if (!user.phone)
    return res.status(400).send({ message: t('errors:sms.bad_request') })

  // send verification code by SMS message based on selected services
  const result = await sendVerificationCode({
    phone: user.phone,
  })

  if (!result)
    return res.status(400).send({ message: t('errors:sms.bad_request') })

  res.status(200).send({ result: 'OK' })
})

export default router
