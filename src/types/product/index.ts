import { Document } from 'mongoose'
import { ISEO } from '../seo'

export interface IProductImage {
  alt?: string
  height?: number
  order: number
  src: string
  width?: number
}

export interface ISubProducts {
  product: IProductSchema
  selected: boolean
}

export interface ITags {
  link: string
  title: string
}

export interface IProductSchema extends Document {
  brandTitles?: string[]
  cateogryTitles?: string[]
  createDate: Date
  description?: string
  images?: IProductImage[]
  isAvailable: boolean
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
