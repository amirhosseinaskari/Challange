import { Response, Request, Router } from 'express'
import { t } from 'subscribers/i18next'
import { auth, sellerAuth } from '~src/middleware/auth'
import { Product } from '~src/models/product'

export const getProducts = (router: Router) => {
  router.get('/getProducts', async (req: Request, res: Response) => {
    const products = await Product.find()
    if (!products.length)
      return res.status(400).send({ message: t('errors:product.bad_request') })

    res.status(200).send({ result: 'OK', products })
  })
}

export const getMyproducts = (router: Router) => {
  router.get(
    '/getMyProducts',
    auth,
    sellerAuth,
    async (req: Request, res: Response) => {
      const { id } = req.body
      if (!id)
        return res
          .status(400)
          .send({ message: t('errors:product.bad_request') })
      const products = await Product.find({ userId: { $eq: id } })
      if (!products.length)
        return res
          .status(400)
          .send({ message: t('errors:product.bad_request') })

      res.status(200).send({ result: 'OK', products })
    }
  )
}
