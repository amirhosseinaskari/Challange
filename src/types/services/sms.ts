export enum SMS_SERVICES {
  KAVENEGAR,
}

export interface IVerifyPhone {
  phone: string
  message: string
  sms_service?: SMS_SERVICES
}

export interface KAVENEGAR {
  phone: string
  message: string
}
