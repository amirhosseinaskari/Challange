import { t } from 'subscribers/i18next'
import mongoose, { Schema, Types } from 'mongoose'
import { IProduct, TITLE_MAXLENGTH, TITLE_MINLENGTH } from '~src/types/product'
import { seoSchema } from '../seo'

export const productSchema = new Schema({
  brandId: {
    type: [Types.ObjectId],
  },
  categoryIds: {
    type: [Types.ObjectId],
  },
  createDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  hasFreeDelivery: {
    type: Boolean,
  },
  hasLocalPayment: {
    type: Boolean,
  },
  images: {
    type: [String],
  },
  isPublished: {
    type: Boolean,
  },
  oldPrice: {
    type: Number,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  rate: {
    type: Number,
    min: 0,
    max: 10,
  },
  seo: {
    type: seoSchema,
  },
  show: {
    type: Boolean,
  },
  soldNumber: {
    type: Number,
    min: 0,
  },
  specialProperties: {
    type: [String],
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  subTitle: {
    type: String,
  },
  tags: {
    type: {
      link: String,
      title: String,
    },
  },
  title: {
    type: String,
    minLength: TITLE_MINLENGTH,
    maxLength: TITLE_MAXLENGTH,
    required: [true, t('errors:product.title_required')],
  },
  voteCount: {
    type: Number,
    min: 0,
  },
})

// create Product model based on product schema
export const Product = mongoose.model<IProduct>('Product', productSchema)
