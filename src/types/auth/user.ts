// minimum and maximum number of name chars
export const USERNAME_MINLENGTH = 3
export const USERNAME_MAXLENGTH = 30

// minimum and maximum number of password chars
export const PASS_MINlENGTH = 4
export const PASS_MAXLENGTH = 30

export enum Roles {
  SELLER,
  BUYER,
}

export type Deposit = 5 | 10 | 20 | 50 | 100

export interface IUser {
  _id?: string
  roles?: Roles[]
  username: string
  password: string
  deposit: Deposit
}

export interface ILogin {
  username: string
  password: string
}
