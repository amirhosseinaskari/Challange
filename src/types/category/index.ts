import { ISEO } from '../seo'

export const TITLE_MINLENGTH = 1
export const TITLE_MAXLENGTH = 100

export interface ICategory {
  flags?: string[]
  seo?: ISEO
  title: string
  parentId?: string
}
