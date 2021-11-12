import config from 'config'
import { t } from 'subscribers/i18next'
import mongoose, { Document, Schema } from 'mongoose'

export const productSchema = new Schema({
  brandTitles: {
    type: [String],
  },
  categoryTitles: {
    type: [String],
  },
  createDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  images: {
    type: [String],
  },
  isAvailable: {
    type: Boolean,
    required: true,
  },
  oldPrice: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
  },
  seo: {
    type: Object,
  },
  show: {
    type: Boolean,
  },
  soldNumber: {
    type: Number,
  },
  specialProperties: {
    type: [String],
  },
  stock: {
    type: Number,
    required: true,
  },
  subProducts: {
    type: {
      product: this,
      selected: Boolean,
    },
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
    required: [true, t('errors:product.title_required')],
  },
  voteCount: {
    type: Number,
  },
})
