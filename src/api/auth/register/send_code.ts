import { Response, Request, Router } from 'express'
import { User } from 'models/user'
import _ from 'lodash'
import { t } from 'subscribers/i18next'
import { sendVerificationCodeBySMS } from 'services/sms'
import randomCode from 'randomatic'
import { sendVerificationCodeByEmail } from '~src/services/email'
import { mailValidator, phoneValidator } from '~src/services/auth/validators'

enum REQUEST_TYPE {
  PHONE = 'phone',
  EMAIL = 'email',
}

export const sendCode = (router: Router) => {
  // resend verification code
  router.post('/sendCode', async (req: Request, res: Response) => {
    const { phone, email, type } = req.body

    const error = phone
      ? await phoneValidator(phone)
      : email
      ? await mailValidator(email)
      : true

    if (error) return res.status(400).send({ validator_error: error })

    const user = await User.findById(phone || email)

    // if user not found
    if (!user)
      return res.status(400).send({ message: t('errors:auth.bad_request') })

    const code = randomCode('0', 4) as string

    if (type === REQUEST_TYPE.EMAIL && user.email) {
      user.emailVerificationCode = code
      const updatedUser = await user.save()
      if (!updatedUser)
        return res.status(400).send({
          message: t('errors.resend_code_failed'),
          phone_verified: false,
        })
      // send verification code by email
      const result = await sendVerificationCodeByEmail({
        email: user.email,
        code,
      })

      if (!result)
        res.status(400).send({
          message: t('errors:auth.resend_code_failed'),
        })
    }

    if (type === REQUEST_TYPE.PHONE && user.phone) {
      user.smsVerificationCode = code
      const updatedUser = await user.save()
      if (!updatedUser)
        return res.status(400).send({
          message: t('errors.resend_code_failed'),
          phone_verified: false,
        })
      // send verification code by SMS message
      const result = await sendVerificationCodeBySMS({
        phone: user.phone,
        code,
      })

      if (!result)
        return res.status(400).send({
          message: t('errors.resend_code_failed'),
          phone_verified: false,
        })
    }

    return res.status(200).send({
      result: 'OK',
    })
  })
}
