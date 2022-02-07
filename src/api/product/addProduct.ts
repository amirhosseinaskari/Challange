import { Response, Request, Router } from 'express'
import { t } from 'subscribers/i18next'
import { auth, sellerAuth } from '~src/middleware/auth'
import { Product } from '~src/models/product'
import { User } from '~src/models/user'

export const addProduct = (router: Router) => {
  router.post(
    '/addProduct',
    auth,
    sellerAuth,
    async (req: Request, res: Response) => {
      const { id, title, price, amount } = req.body

      if (!id || !title || !price || !amount)
        return res
          .status(400)
          .send({ messages: t('errors:product.bad_request') })

      const user = await User.findById({ _id: id })
      if (!user)
        return res
          .status(400)
          .send({ message: t('errors:product.bad_request') })

      const product = new Product()
      product.title = title
      product.price = price
      product.amount = amount
      product.userId = id

      const result = await product.save()
      if (!result)
        return res
          .status(400)
          .send({ message: t('errors:product.bad_request') })

      res.status(200).send({ result: 'OK' })
    }
  )
}
