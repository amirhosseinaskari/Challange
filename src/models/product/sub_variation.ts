import mongoose, { Schema, Types } from 'mongoose'
import { ISubVariation } from '~src/types/product'
import { t } from 'subscribers/i18next'

export const subVariationSchema = new Schema({
  image: {
    type: String,
  },
  price: {
    type: Number,
    min: 0,
  },
  title: {
    type: String,
    required: [true, t('errors:variation.title_required')],
  },
  variationId: {
    type: Types.ObjectId,
    required: [true, t('errors:variation.variationId_required')],
  },
})

export const SubVariation = mongoose.model<ISubVariation>(
  'SubVariation',
  subVariationSchema
)
