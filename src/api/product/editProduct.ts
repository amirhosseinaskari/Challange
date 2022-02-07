import { Response, Request, Router } from 'express'
import { t } from 'subscribers/i18next'
import { auth, sellerAuth } from '~src/middleware/auth'
import { Product } from '~src/models/product'
import { User } from '~src/models/user'

export const editProduct = (router: Router) => {
  router.put(
    '/editProduct',
    auth,
    sellerAuth,
    async (req: Request, res: Response) => {
      const { id, title, price, amount, productId } = req.body

      if (!id || !productId)
        return res
          .status(400)
          .send({ messages: t('errors:product.bad_request') })

      const user = await User.findById({ _id: id })
      if (!user)
        return res
          .status(400)
          .send({ message: t('errors:product.bad_request') })

      const product = await Product.findById({ _id: productId })
      if (!product)
        return res
          .status(400)
          .send({ message: t('errors:product.bad_request') })

      if (title && !!title.trim()) product.title = title
      if (price) product.price = price
      if (amount) product.amount = amount

      const result = await product.save()
      if (!result)
        return res
          .status(400)
          .send({ message: t('errors:product.bad_request') })

      res.status(200).send({ result: 'OK' })
    }
  )
}
