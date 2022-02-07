import { Response, Request, Router } from 'express'
import { t } from 'subscribers/i18next'
import { auth } from '~src/middleware/auth'
import { Buy } from '~src/models/payment/buy'
import { User } from '~src/models/user'

export const addBuy = (router: Router) => {
  router.post('/buy', auth, async (req: Request, res: Response) => {
    const { id, productId, amount } = req.body

    if (!id || !productId || !amount)
      return res.status(400).send({ messages: t('errors:buy.bad_request') })

    const user = await User.findById({ _id: id })
    if (!user)
      return res.status(400).send({ message: t('errors:buy.bad_request') })

    if (user.deposit <= amount)
      return res.status(400).send({ message: t('errors:buy.not_enough') })

    const buy = new Buy()
    buy.productId = productId
    buy.amount = amount
    buy.userId = id

    const result = await buy.save()
    if (!result)
      return res.status(400).send({ message: t('errors:buy.bad_request') })

    res.status(200).send({ result: 'OK' })
  })
}
