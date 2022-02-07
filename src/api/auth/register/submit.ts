import { Response, Request, Router } from 'express'
import { User } from 'models/user'
import _ from 'lodash'
import { userValidator } from '~src/services/userValidator'
import { t } from 'subscribers/i18next'
import { IUser, Roles } from '~types/auth/user'
import { hashPass } from '~utils/hash'
import { findUser } from '~utils/findeUser'

export const registerBuyer = (router: Router) => {
  router.post('/buyer', async (req: Request, res: Response) => {
    const { username, password } = req.body

    const error = await userValidator(req.body as IUser)
    if (error) return res.status(400).send({ validator_error: error })

    // is user registered before (check based on username)
    let user = await findUser(username)

    // send error if user is registered before (is found in db)
    if (user)
      return res.status(400).send({ message: t('errors:auth.user_registered') })

    // hash password
    const hashed_password = await hashPass(password)

    // create new user model by inputs
    user = new User({
      username,
      password: hashed_password,
      roles: [Roles.BUYER],
    })

    // save user to db
    const result = await user.save()

    if (!result)
      return res.status(400).send({ message: t('errors:register.bad_request') })

    const token = await user.generateAuthToken()
    return res.status(200).send({ token })
  })
}

export const registerSeller = (router: Router) => {
  router.post('/seller', async (req: Request, res: Response) => {
    const { username, password } = req.body

    const error = await userValidator(req.body as IUser)
    if (error) return res.status(400).send({ validator_error: error })

    // is user registered before (check based on username)
    let user = await findUser(username)

    // send error if user is registered before (is found in db)
    if (user)
      return res.status(400).send({ message: t('errors:auth.user_registered') })

    // hash password
    const hashed_password = await hashPass(password)

    // create new user model by inputs
    user = new User({
      username,
      password: hashed_password,
      roles: [Roles.SELLER],
    })

    // save user to db
    const result = await user.save()

    if (!result)
      return res.status(400).send({ message: t('errors:register.bad_request') })

    const token = await user.generateAuthToken()
    return res.status(200).send({ token })
  })
}
