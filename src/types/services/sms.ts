export enum SMS_SERVICES {
  KAVENEGAR,
}

export interface IVerifyPhone {
  phone: string
}

export interface KAVENEGAR {
  phone: string
  message: string
}

export interface SMS {
  service: SMS_SERVICES
  data: KAVENEGAR
}
