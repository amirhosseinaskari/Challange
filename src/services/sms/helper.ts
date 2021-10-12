import { ISMS } from '.'

export const SMS_SENDER = {
  kavenegar: (props: ISMS) => sendByKavenegar({ ...props }),
}

// kavenegar service to send sms
export const sendByKavenegar = async ({ phone, message }: ISMS) => {
  // send sms by kavenegar
  return true
}
