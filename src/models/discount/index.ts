import { t } from 'subscribers/i18next'
import mongoose, { Schema, Types } from 'mongoose'
import { IDiscount, CODE_MAXLENGTH, CODE_MINLENGTH } from '~src/types/discount'

export const discountSchema = new Schema({
  productIds: {
    type: [Types._ObjectId],
  },
  userIds: {
    type: [Types._ObjectId],
  },
  categoryIds: {
    type: [Types._ObjectId],
  },
  code: {
    type: String,
    minLength: CODE_MINLENGTH,
    maxLength: CODE_MAXLENGTH,
    required: [true, t('errors:discount.code_required')],
  },
  isActive: {
    type: Boolean,
  },
  flags: {
    type: [String],
  },
  startDate: {
    type: Date,
  },
  expireDate: {
    type: Date,
  },
  maxPrice: {
    type: Number,
    default: -1,
  },
})

// create Category model based on category schema
export const Category = mongoose.model<IDiscount>('Discount', discountSchema)
