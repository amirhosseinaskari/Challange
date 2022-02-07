import { Response, Request, Router } from 'express'
import { t } from 'subscribers/i18next'
import { auth } from '~src/middleware/auth'
import { User } from '~src/models/user'
import { depositValidator } from '~src/services/depostValidator'

export const addDeposit = (router: Router) => {
  router.post('/deposit', auth, async (req: Request, res: Response) => {
    const { id, amount } = req.body

    if (!id || !amount)
      return res.status(400).send({ messages: t('errors:deposit.bad_request') })

    const error = depositValidator(String(amount))
    if (error)
      return res.status(400).send({ messages: t('errors:deposit.bad_request') })

    const user = await User.findById({ _id: id })
    if (!user)
      return res.status(400).send({ message: t('errors:deposit.bad_request') })

    user.deposit = user.deposit + amount

    const result = await user.save()
    if (!result)
      return res.status(400).send({ message: t('errors:deposit.bad_request') })

    res.status(200).send({ result: 'OK' })
  })
}
