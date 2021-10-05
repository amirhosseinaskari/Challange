import {IVerifyPhone, KAVENEGAR, SMS_SERVICES} from '~types/services/sms'
import randomize from 'randomatic'

// send verficiation code to user phone number
export const sendVerificationCode = async ({
  phone,
  sms_service = SMS_SERVICES.KAVENEGAR,
}: IVerifyPhone) => {
  let result = false
  const message = randomize('0', 4)
  switch (sms_service) {
    case SMS_SERVICES.KAVENEGAR:
      result = await sendByKavenegar({phone, message})
      break
    default:
      break
  }
  return result
}

// kavenegar service to send sms
export const sendByKavenegar = async ({phone, message}: KAVENEGAR) => {
  // send sms by kavenegar
  return true
}
