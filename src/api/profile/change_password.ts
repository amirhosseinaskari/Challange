import { compare } from 'bcrypt'
import { Response, Request, Router } from 'express'
import { passwordValidator } from '~src/services/userValidator'
import { t } from 'subscribers/i18next'
import { auth } from '~src/middleware/auth'
import { User } from '~src/models/user'
import { hashPass } from '~src/utils/hash'

export const changePassword = (router: Router) => {
  router.post('/change_password', auth, async (req: Request, res: Response) => {
    const { id, old_password, new_password } = req.body
    // validate new name
    const error = await passwordValidator(new_password)
    if (error) return res.status(400).send({ validator_error: error })

    // update name of user
    const user = await User.findById({ _id: id })
    if (!user)
      return res
        .status(400)
        .send({ message: t('errors:profile.update_failed') })

    // check password
    const is_valid_password = await compare(old_password, user.password)
    if (!is_valid_password)
      return res.status(400).send({ message: t('errors:auth.login') })

    // hash password
    const hashed_password = await hashPass(new_password)
    user.password = hashed_password
    const result = await user.save()
    if (!result)
      return res
        .status(400)
        .send({ message: t('errors:profile.update_failed') })

    res.status(200).send({ result: 'OK' })
  })
}
