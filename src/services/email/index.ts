import { IVerifyEmail } from '~src/types/services/sms'
import { IEmail } from '../sms'

export const sendEmail = async (data: IEmail) => {
  return true
}

// send verification code by email
export const sendVerificationCodeByEmail = async ({
  email,
  code,
}: IVerifyEmail) => {
  let result = false
  result = await sendEmail({ email, message: code })
  return result
}
