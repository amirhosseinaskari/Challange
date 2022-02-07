import { Response, Request, Router } from 'express'
import { t } from 'subscribers/i18next'
import { auth } from '~src/middleware/auth'
import { Sell } from '~src/models/payment/sell'
import { User } from '~src/models/user'

export const addSell = (router: Router) => {
  router.post('/sell', auth, async (req: Request, res: Response) => {
    const { id, productId, amount } = req.body

    if (!id || !productId || !amount)
      return res.status(400).send({ messages: t('errors:sell.bad_request') })

    const user = await User.findById({ _id: id })
    if (!user)
      return res.status(400).send({ message: t('errors:sell.bad_request') })

    const sell = new Sell()
    sell.productId = productId
    sell.amount = amount
    sell.userId = id

    const result = await sell.save()
    if (!result)
      return res.status(400).send({ message: t('errors:sell.bad_request') })

    res.status(200).send({ result: 'OK' })
  })
}
