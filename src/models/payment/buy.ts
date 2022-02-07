import { t } from 'subscribers/i18next'
import mongoose, { Schema } from 'mongoose'
import { IBuy } from '~src/types/buy'
import { ObjectId } from 'bson'

export const buySchema = new Schema({
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

// create Buy model based on buy schema
export const Buy = mongoose.model<IBuy>('Buy', buySchema)
