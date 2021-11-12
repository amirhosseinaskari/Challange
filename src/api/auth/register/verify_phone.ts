import { Response, Request, Router } from 'express'
import { User } from 'models/user'
import _ from 'lodash'
import { t } from 'subscribers/i18next'
import { phoneValidator } from '~src/services/auth/validators'

// Also you can use this api to authenticate a user without password or other stuffs
// if you want use this api as authentication, first you should send a code to his/her phone

export const verifyPhone = (router: Router) => {
  router.post('/verifyPhone', async (req: Request, res: Response) => {
    const { phone, code } = req.body

    if (!code)
      return res.status(400).send({ message: t('errors:sms.bad_request') })

    // check phone validation
    const error = await phoneValidator(phone)
    if (error) return res.status(400).send({ validator_error: error })

    // find user by phone
    const user = await User.findById(phone)

    // if user not found
    if (!user)
      return res.status(401).send({ message: t('errors:auth.authentication') })

    if (code !== user.smsVerificationCode) {
      return res.status(400).send({ message: t('errors:sms.bad_request') })
    }

    // update user
    user.phoneVerified = true
    user.smsVerificationCode = null
    const result = user.save()
    if (!result)
      return res.status(400).send({ message: t('errors:auth.bad_request') })

    const token = await user.generateAuthToken()
    res.status(200).send({ token })
  })
}
