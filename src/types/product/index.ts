import { Document, ObjectId } from 'mongoose'

export interface IProduct extends Document {
  price: number
  amount: number
  title: string
  userId: ObjectId
}
