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
export interface IUserRegister {
  name?: string
  phone: string
  email?: string
  roles: Roles[]
  password?: string
  status: boolean
}
