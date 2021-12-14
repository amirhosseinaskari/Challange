import { t } from 'subscribers/i18next'
import mongoose, { Schema, Types } from 'mongoose'
import {
  ICategory,
  TITLE_MAXLENGTH,
  TITLE_MINLENGTH,
} from '~src/types/category'
import { seoSchema } from '../seo'

export const categorySchema = new Schema({
  parentId: {
    type: [Types._ObjectId],
  },
  title: {
    type: String,
    minLength: TITLE_MINLENGTH,
    maxLength: TITLE_MAXLENGTH,
    required: [true, t('errors:category.title_required')],
  },
  seo: {
    type: seoSchema,
  },
  order: {
    type: Number,
    required: true,
  },
  flags: {
    type: [String],
  },
})

// create Category model based on category schema
export const Category = mongoose.model<ICategory>('Category', categorySchema)
