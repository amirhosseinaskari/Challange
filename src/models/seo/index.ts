import { Schema } from 'mongoose'

export const seoSchema = new Schema({
  title: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  redirect: {
    type: String,
  },
})
