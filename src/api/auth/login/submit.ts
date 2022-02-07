import { Response, Request, Router } from 'express'
import { userValidator } from '~src/services/userValidator'
import { t } from 'subscribers/i18next'
import { compare } from 'bcrypt'
import { findUser } from '~utils/findeUser'

export const submit = (router: Router) => {
  router.post('/', async (req: Request, res: Response) => {
    const { username, password } = req.body

    // if username or password is null return bad_request error to client
    if (!username || !password)
      return res.status(400).send({ message: t('errors:auth.bad_request') })

    // check validation of username, deposit and password
    const error = await userValidator({ username, password })

    if (error) return res.status(400).send({ validator_error: error })

    // check does user exist
    const user = await findUser(username)

    if (!user) return res.status(400).send({ message: t('errors:auth.login') })

    // check password
    const is_valid_password = await compare(password, user.password)
    if (!is_valid_password)
      return res.status(400).send({ message: t('errors:auth.login') })

    const token = await user.generateAuthToken()
    res.status(200).send({ token })
  })
}
