import debug from 'debug'
import Joi from 'joi'
import { t } from 'subscribers/i18next'
import {
  ILogin,
  IUser,
  NAME_MAXLENGTH,
  NAME_MINLENGTH,
  PASS_MAXLENGTH,
  PASS_MINlENGTH,
} from '~types/auth/user'

// phone number validator => 09121234567
export const phoneValidator = async (phone?: string | null) => {
  const schema = Joi.object({
    phone: Joi.string()
      .required()
      .regex(/^[0][9][0-9]{9}$/)
      .messages({
        'any.required': t('errors:user.phone_required'),
        'string.pattern.base': t('errors:user.phone_number'),
        'string.empty': t('errors:user.phone_required'),
      }),
  })
  try {
    const {
      error: { details = [] },
    } = schema.validate({ phone: phone.trim() })
    return details[0]?.message
  } catch (error) {
    return null
  }
}

// name validator (letters with min and max limitation)
export const nameValidator = async (name?: string | null) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .min(NAME_MINLENGTH)
      .max(NAME_MAXLENGTH)
      .regex(/^[a-zA-Z\u0600-\u06FF ]+$/)
      .messages({
        'any.required': t('errors:user.name_required'),
        'string.min': t('errors:user.name_minLength', {
          number: NAME_MINLENGTH,
        }),
        'string.max': t('errors:user.name_maxLength', {
          number: NAME_MAXLENGTH,
        }),
        'string.pattern.base': t('errors:user.name'),
        'string.empty': t('errors:user.name_required'),
      }),
  })
  try {
    const {
      error: { details = [] },
    } = schema.validate({ name: name.trim() })
    return details[0]?.message
  } catch (error) {
    return null
  }
}

// password validator with specific symbols and letters
export const passwordValidator = async (password?: string | null) => {
  const schema = Joi.object({
    password: Joi.string()
      .required()
      .min(PASS_MINlENGTH)
      .max(PASS_MAXLENGTH)
      .regex(/[A-Za-z\d$@$!%*?&~=.]/)
      .messages({
        'any.required': t('errors:user.password_required'),
        'string.min': t('errors:user.password_minLength', {
          number: PASS_MINlENGTH,
        }),
        'string.max': t('errors:user.password_maxLength', {
          number: PASS_MAXLENGTH,
        }),
        'string.pattern.base': t('errors:user.password'),
        'string.empty': t('errors:user.password_required'),
      }),
  })
  try {
    const {
      error: { details = [] },
    } = schema.validate({ password })
    return details[0]?.message
  } catch (error) {
    return null
  }
}

// mail validator
export const mailValidator = async (mail?: string | null) => {
  const schema = Joi.object({
    mail: Joi.string()
      .required()
      .email()
      .messages({
        'any.required': t('errors:user.mail_required'),
        'string.email': t('errors:user.mail'),
        'string.empty': t('errors:user.mail_required'),
      }),
  })
  try {
    const {
      error: { details = [] },
    } = schema.validate({ mail: mail.trim() })
    return details[0]?.message
  } catch (error) {
    return null
  }
}

// user validator => name, phone, email, password
// return error messeges
export const userValidator = async ({
  phone,
  email,
  name,
  password,
}: IUser) => {
  const phone_error = phone && (await phoneValidator(phone))
  const password_error = await passwordValidator(password || null)
  const email_error = email && (await mailValidator(email))
  const name_error = name && (await nameValidator(name))
  const has_error =
    !!phone_error || !!email_error || !!name_error || !!password_error

  return has_error
    ? {
        phone_error,
        email_error,
        name_error,
        password_error,
      }
    : null
}
