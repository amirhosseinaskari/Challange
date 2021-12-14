import { Document, ObjectId } from 'mongoose'

export const CODE_MINLENGTH = 3
export const CODE_MAXLENGTH = 100

export interface IDiscount extends Document {
  flags?: string[]
  title: string
  productIds?: ObjectId[]
  categoryIds?: ObjectId[]
  userIds?: ObjectId[]
  expirationDate?: Date
  startDate?: Date
  isActive: boolean
  maxPrice?: Number
}
