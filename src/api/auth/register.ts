import express, { Response, Request } from 'express'
import { User } from 'models/user'
import _ from 'lodash'
import { userValidator } from 'services/auth/validators'
import { t } from 'subscribers/i18next'
import { IUser, Roles, UniqueItem } from '~types/auth/user'
import { hashPass } from '~utils/hash'
import { findUser } from '~utils/findeUser'
import { sendVerificationCodeBySMS } from 'services/sms'
import { auth } from '~src/middleware/auth'
import config from 'config'
import randomCode from 'randomatic'
import { sendVerificationCodeByEmail } from '~src/services/email'

const router = express.Router()

// register a user
router.post('/', async (req: Request, res: Response) => {
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
    status: false,
  })
  const code = randomCode('0', 4) as string
  user.smsVerificationCode = code
  user.emailVerificationCode = code

  // save user to db
  await user.save()

  // verification
  let result = true
  const hasPhoneVerification = config.get('verification.has_phone_verification')
  const hasEmailVerification = config.get('verification.has_email_verification')
  if (hasPhoneVerification) {
    if (!user.phone) {
      result = false
      return res.status(400).send({ message: t('errors:user.phone_required') })
    }
    // send verification code by SMS message
    result = await sendVerificationCodeBySMS({
      phone: user.phone,
      code,
    })
  }

  if (hasEmailVerification) {
    if (!user.email) {
      result = false
      return res.status(400).send({ message: t('errors:user.mail_required') })
    }
    // send verification code by email
    result = await sendVerificationCodeByEmail({
      email: user.email,
      code,
    })
  }

  if (!result)
    return res.status(400).send({ message: t('errors:sms.bad_request') })

  if (hasEmailVerification || hasPhoneVerification)
    return res.status(200).send({
      id: user.id,
    })

  const token = await user.generateAuthToken()
  return res.status(200).send({ token })
})

// it's secure
router.post('/verifyPhone', async (req: Request, res: Response) => {
  const { id, code } = req.body
  const user = await User.findById(id)

  // if user not found
  if (!user)
    return res.status(401).send({ message: t('errors:auth.authentication') })

  // if user status is phone verified
  if (user.phoneVerified)
    return res.status(400).send({
      message: t('errors:sms.phone_verified_before'),
      phone_verified: true,
    })

  // if user.phone doesn't exist
  if (!user.phone)
    return res.status(400).send({ message: t('errors:sms.bad_request') })

  if (code === user.smsVerificationCode) {
  }

  const token = await user.generateAuthToken()
  res.status(200).send({ token })
})

// resend verification code
router.post('/resendCode', async (req: Request, res: Response) => {
  const { id, type } = req.body
  const user = await User.findById(id)

  // if user not found
  if (!user)
    return res.status(401).send({ message: t('errors:auth.authentication') })

  if (type === 'phone' && user.phoneVerified)
    return res.status(400).send({
      message: t('errors:sms.phone_verified_before'),
      phone_verified: true,
    })

  if (type === 'email' && user.emailVerified)
    return res.status(400).send({
      message: t('errors:email_verified_before'),
      phone_verified: true,
    })

  let result = false
  const code = randomCode('0', 4) as string

  if (type === 'email' && user.email) {
    user.emailVerificationCode = code
    const updatedUser = await user.save()
    if (!updatedUser)
      return res.status(400).send({
        message: t('errors.resend_code_failed'),
        phone_verified: false,
      })
    // send verification code by email
    result = await sendVerificationCodeByEmail({
      email: user.email,
      code,
    })
  }

  if (type === 'phone' && user.phone) {
    user.smsVerificationCode = code
    const updatedUser = await user.save()
    if (!updatedUser)
      return res.status(400).send({
        message: t('errors.resend_code_failed'),
        phone_verified: false,
      })
    // send verification code by SMS message
    result = await sendVerificationCodeBySMS({
      phone: user.phone,
      code,
    })
  }

  return res.status(200).send({
    code,
  })
})
export default router
