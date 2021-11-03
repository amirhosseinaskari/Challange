// minimum and maximum number of name chars
export const NAME_MINLENGTH = 3
export const NAME_MAXLENGTH = 30

// minimum and maximum number of password chars
export const PASS_MINlENGTH = 4
export const PASS_MAXLENGTH = 30

export enum Roles {
  PUBLIC,
  ADMIN,
}

export interface IUser {
  _id?: string
  roles?: Roles[]
  register_date?: Date
  name?: string
  phone?: string
  email?: string
  emailVerificationCode?: string
  smsVerificationCode?: string
  password?: string
  emailVerified?: boolean
  phoneVerified?: boolean
}

// unique item for register
export enum UniqueItem {
  PHONE,
  EMAIL,
  NAME,
}
export interface ILogin {
  phone?: string
  email?: string
  name?: string
  password?: string
  unique_item: UniqueItem
  item: string
}
