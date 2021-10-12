import { IVerifyPhone } from '~types/services/sms'
import randomize from 'randomatic'
import config from 'config'
import { SMS_SENDER } from './helper'

export interface ISMS {
  phone: string
  message: string
}

export const sendSMS = async (data: ISMS) => {
  let result = false
  const service = config.get('sms_service') as string
  if (Object(SMS_SENDER)[service]) Object(SMS_SENDER)[service](data)
  return result
}

// send verficiation code to user phone number
export const sendVerificationCode = async ({ phone }: IVerifyPhone) => {
  let result = false
  const message = randomize('0', 4)
  result = await sendSMS({ phone, message })
  return result
}
