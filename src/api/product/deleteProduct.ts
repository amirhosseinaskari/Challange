import { Response, Request, Router } from 'express'
import { t } from 'subscribers/i18next'
import { auth, sellerAuth } from '~src/middleware/auth'
import { Product } from '~src/models/product'
import { User } from '~src/models/user'

export const deleteProduct = (router: Router) => {
  router.delete(
    '/deleteProduct',
    auth,
    sellerAuth,
    async (req: Request, res: Response) => {
      const { id, productId } = req.body

      if (!id || !productId)
        return res
          .status(400)
          .send({ messages: t('errors:product.bad_request') })

      const user = await User.findById({ _id: id })
      if (!user)
        return res
          .status(400)
          .send({ message: t('errors:product.bad_request') })

      const result = await Product.findByIdAndDelete({ _id: productId })
      if (!result)
        return res
          .status(400)
          .send({ message: t('errors:product.bad_request') })

      res.status(200).send({ result: 'OK' })
    }
  )
}
