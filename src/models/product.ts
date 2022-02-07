import { t } from 'subscribers/i18next'
import mongoose, { Schema } from 'mongoose'
import { IProduct } from '~src/types/product'
import { ObjectId } from 'bson'

export const productSchema = new Schema({
  price: {
    type: Number,
    required: [true, t('errors:product.price_required')],
    min: 5,
  },
  amount: {
    type: Number,
    required: [true, t('errors:product.amount_required')],
    min: 0,
  },

  username: {
    type: String,
    required: [true, t('errors:product.title_required')],
  },

  userId: {
    type: ObjectId,
  },
})

// create Product model based on product schema
export const Product = mongoose.model<IProduct>('Product', productSchema)
