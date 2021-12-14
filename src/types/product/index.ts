import { Document, ObjectId } from 'mongoose'
import { ISEO } from '../seo'

export const TITLE_MINLENGTH = 1
export const TITLE_MAXLENGTH = 100

export interface IProductImage {
  alt?: string
  height?: number
  order: number
  src: string
  width?: number
}

export interface ISubProducts {
  product: IProduct
  selected: boolean
}

export interface ITags {
  link: string
  title: string
}

export interface IProduct extends Document {
  brandTitles?: string[]
  cateogryTitles?: string[]
  createDate: Date
  description?: string
  hasFreeDelivery: boolean
  hasLocalPayment: boolean
  images?: IProductImage[]
  isPublished: boolean
  oldPrice?: number
  price: number
  rate: number
  seo?: ISEO
  show: boolean
  soldNumber: number
  specialProperties?: string[]
  stock: number
  subProducts?: ISubProducts[]
  subTitle?: string
  tags?: ITags[]
  title: string
  voteCount: number
}

export interface IProductVariation extends Document {
  hasDifferentPrice: boolean
  productId: ObjectId
  title: string
}

export interface ISubVariation extends Document {
  price: number
  title: string
  variationId: ObjectId
}
