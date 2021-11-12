import config from 'config'
import { t } from 'subscribers/i18next'
import mongoose, { Document, Schema } from 'mongoose'

export const productSchema = new Schema({
  brandTitles: {
    type: [String],
  },
  category_titles: {
    type: [String],
  },
  create_date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  images: {
    type: [String],
  },
  is_available: {
    type: Boolean,
    required: true,
  },
  old_price: {
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
  sold_number: {
    type: Number,
  },
  special_properties: {
    type: [String],
  },
  stock: {
    type: Number,
    required: true,
  },
  sub_products: {
    type: {
      product: this,
      selected: Boolean,
    },
  },
  sub_title: {
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
  vote_count: {
    type: Number,
  },
})
