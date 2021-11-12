import { Response, Request, Router } from 'express'
import { nameValidator } from 'services/auth/validators'
import { t } from 'subscribers/i18next'
import { auth } from '~src/middleware/auth'
import { User } from '~src/models/user'

export const editInfo = (router: Router) => {
  router.post('/edit_info', auth, async (req: Request, res: Response) => {
    const { id, name, email, phone } = req.body
    // validate new name
    const error = await nameValidator(name)
    if (error) return res.status(400).send({ validator_error: error })

    // update name of user
    const user = await User.findById({ id })
    user.phone = phone ? phone : user.phone
    user.email = email ? email : user.email
    user.name = name ? name : user.name
    user.emailVerified = email ? false : user.emailVerified
    user.phoneVerified = phone ? false : user.phoneVerified
    user.smsVerificationCode = phone ? null : user.smsVerificationCode
    user.emailVerificationCode = email ? null : user.emailVerificationCode

    const result = await user.save()

    if (!result)
      return res
        .status(400)
        .send({ message: t('errors:profile.update_failed') })

    res.status(200).send({ name, email, phone, result: 'OK' })
  })
}
