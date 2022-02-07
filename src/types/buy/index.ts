import { Document, ObjectId } from 'mongoose'

export interface IBuy extends Document {
  productId: string
  amount: number
  userId: ObjectId
}
