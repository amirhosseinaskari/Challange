import debug from 'debug'
import express, {Response, Request} from 'express'
import {User} from 'models/user'
import {userValidator} from 'services/auth/validators'
import {t} from 'subscribers/i18next'
import {IUser} from 'types/auth/user'

const router = express.Router()
const dbDebugger = debug('app:db')
const startupDebugger = debug('app:startup')
// register a user
router.post('/register', async (req: Request, res: Response) => {
  const {phone, name, password, email} = req.body
  const error = await userValidator(req.body as IUser, {
    email_required: false,
    name_required: false,
  })
  if (error) res.status(400).send(error)

  // find user in db
  let user = await User.findOne({phone})

  // send error if user is registered before (is found in db)
  if (user) return res.status(400).send(t('errors:auth.user_registered'))

  // create new user model by inputs
  user = new User({
    name,
    phone,
    password,
    email,
  })

  await user.save()
  return res.send({
    name,
    phone,
    email,
  })
})

export default router
