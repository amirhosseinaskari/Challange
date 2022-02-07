import { Document, ObjectId } from 'mongoose'

export interface ISell extends Document {
  productId: string
  amount: number
  userId: ObjectId
}
