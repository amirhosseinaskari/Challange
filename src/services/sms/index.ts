import { IVerifyPhone, KAVENEGAR, SMS, SMS_SERVICES } from '~types/services/sms'
import randomize from 'randomatic'

// send verficiation code to user phone number
export const sendVerificationCode = async ({ phone }: IVerifyPhone) => {
  let result = false
  const message = randomize('0', 4)
  return result
}

export const sendSMS = async ({ service, data }: SMS) => {
  let result = false
  switch (service) {
    case SMS_SERVICES.KAVENEGAR:
      result = await sendByKavenegar(data)
      break

    default:
      break
  }

  return result
}

// kavenegar service to send sms
export const sendByKavenegar = async ({ phone, message }: KAVENEGAR) => {
  // send sms by kavenegar
  return true
}
