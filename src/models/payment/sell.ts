import { t } from 'subscribers/i18next'
import mongoose, { Schema } from 'mongoose'
import { ISell } from '~src/types/sell'
import { ObjectId } from 'bson'

export const sellSchema = new Schema({
  userId: {
    type: ObjectId,
  },

  amount: {
    type: Number,
    required: true,
    min: 5,
  },

  productId: {
    type: String,
    required: [true, t('errors:product.id_required')],
  },
})

// create Sell model based on sell schema
export const Sell = mongoose.model<ISell>('Sell', sellSchema)
