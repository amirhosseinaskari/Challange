import { IVerifyPhone } from '~types/services/sms'
import config from 'config'
import { SMS_SENDER } from './helper'

export interface ISMS {
  phone: string
  message: string
}

export interface IEmail {
  email: string
  message: string
}

export const sendSMS = async (data: ISMS) => {
  let result = true
  const service = config.get('sms_service') as string
  if (Object(SMS_SENDER)[service]) Object(SMS_SENDER)[service](data)
  return result
}

// send verficiation code to user phone number
export const sendVerificationCodeBySMS = async ({
  phone,
  code,
}: IVerifyPhone) => {
  let result = false
  result = await sendSMS({ phone, message: code })
  return result
}
