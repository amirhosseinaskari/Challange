import {
  IVerifyPhone,
  IKAVENEGAR,
  ISMS,
  SMS_SERVICES,
} from '~types/services/sms'
import randomize from 'randomatic'
import config from 'config'

export const sendSMS = async ({ service, data }: ISMS) => {
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
export const sendByKavenegar = async ({ phone, message }: IKAVENEGAR) => {
  // send sms by kavenegar
  return true
}

// send verficiation code to user phone number
export const sendVerificationCode = async ({ phone }: IVerifyPhone) => {
  let result = false
  const message = randomize('0', 4)
  result = await sendSMS({
    service: config.get('sms_service.kavenegar'),
    data: { phone, message },
  })
  return result
}
