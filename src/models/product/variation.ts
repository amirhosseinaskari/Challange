import { t } from 'subscribers/i18next'
import mongoose, { Schema, Types } from 'mongoose'
import { IProductVariation } from '~src/types/product'

export const variationSchema = new Schema({
  hasDifferentPrice: {
    type: Boolean,
  },
  productId: {
    type: Types.ObjectId,
    required: [true, t('errors:variation.productId_required')],
  },
  title: {
    type: String,
    required: [true, t('errors:variation.title_required')],
  },
})

export const Variation = mongoose.model<IProductVariation>(
  'Variation',
  variationSchema
)
