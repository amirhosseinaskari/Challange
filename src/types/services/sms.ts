export enum SMS_SERVICES {
  KAVENEGAR,
}

export interface IVerifyPhone {
  phone: string
}

export interface INewUserSubmition {
  phone: string
  name: string
}

export interface IKAVENEGAR {
  phone: string
  message: string
}

export interface ISMS {
  service: SMS_SERVICES
  data: IKAVENEGAR
}
