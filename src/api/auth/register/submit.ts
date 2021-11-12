import { Response, Request, Router } from 'express'
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

// verification
const hasPhoneVerification = config.get('verification.has_phone_verification')
const hasEmailVerification = config.get('verification.has_email_verification')

export const register = (router: Router) => {
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

    if (hasPhoneVerification) {
      if (!user.phone) {
        return res
          .status(400)
          .send({ message: t('errors:user.register_failed') })
      }
      // send verification code by SMS message
      const result = await sendVerificationCodeBySMS({
        phone: user.phone,
        code,
      })

      if (!result)
        return res.status(400).send({ message: t('errors:auth.bad_request') })
    }

    if (hasEmailVerification) {
      if (!user.email) {
        return res.status(400).send({ message: t('errors:auth.bad_request') })
      }
      // send verification code by email
      const result = await sendVerificationCodeByEmail({
        email: user.email,
        code,
      })

      if (!result)
        return res.status(400).send({ message: t('errors:auth.bad_request') })
    }

    // save user to db
    const result = await user.save()

    if (!result)
      return res.status(400).send({ message: t('errors:sms.bad_request') })

    if (hasEmailVerification || hasPhoneVerification)
      return res.status(200).send({
        id: user.id,
      })

    const token = await user.generateAuthToken()
    return res.status(200).send({ token })
  })
}
