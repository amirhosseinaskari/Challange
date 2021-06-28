import debug from 'debug'
import Joi from 'joi'
import {t} from 'subscribers/i18next'
import {
  IUser,
  NAME_MAXLENGTH,
  NAME_MINLENGTH,
  PASS_MAXLENGTH,
  PASS_MINlENGTH,
} from 'types/auth/user'

// debuugers
const dbDebugger = debug('app:db')
const startupDebugger = debug('app:startup')

// phone number validator => 09121234567
export const phoneValidator = async (phone: string | null) => {
  const schema = Joi.object({
    phone: Joi.string()
      .required()
      .regex(/^[0][9][0-9]{9}$/)
      .messages({
        'any.required': t('errors:user.phone_required'),
        'string.pattern.base': t('errors:user.phone_number'),
      }),
  })

  const {
    error: {details = []},
  } = schema.validate({phone})
  return details[0]?.message
}

// name validator (letters with min and max limitation)
export const nameValidator = async (
  name: string | null,
  required: boolean = false
) => {
  if (!name && !required) return // if name is not required return null
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .min(NAME_MINLENGTH)
      .max(NAME_MAXLENGTH)
      .regex(/[a-zA-Z\u0600-\u06FF\s]/)
      .messages({
        'any.required': t('errors:user.name_required'),
        'string.min': t('errors:user.name_minLength', {number: NAME_MINLENGTH}),
        'string.max': t('errors:user.name_maxLength', {number: NAME_MAXLENGTH}),
        'string.pattern.base': t('errors:user.name'),
      }),
  })

  const {
    error: {details = []},
  } = schema.validate({name})
  return details[0]?.message
}

// password validator with specific symbols and letters
export const passwordValidator = async (password: string | null) => {
  const schema = Joi.object({
    password: Joi.string()
      .required()
      .min(PASS_MINlENGTH)
      .max(PASS_MAXLENGTH)
      .regex(/[A-Za-z\d$@$!%*?&=.]/)
      .messages({
        'any.required': t('errors:user.password_required'),
        'string.min': t('errors:user.password_minLength', {
          number: PASS_MINlENGTH,
        }),
        'string.max': t('errors:user.password_maxLength', {
          number: PASS_MAXLENGTH,
        }),
        'string.pattern.base': t('errors:user.password'),
      }),
  })
  const {
    error: {details = []},
  } = schema.validate({password})
  return details[0]?.message
}

// mail validator
export const mailValidator = async (
  mail: string | null,
  required: boolean = false
) => {
  if (!mail && !required) return // if email is not required return null
  const schema = Joi.object({
    mail: Joi.string()
      .required()
      .email()
      .messages({
        'any.required': t('errors:user.mail_required'),
        'string.mail': t('errors:user.mail'),
      }),
  })
  const {
    error: {details = []},
  } = schema.validate({mail})
  return details[0]?.message
}

// user validator => name, phone, email, password
// return error messeges
export const userValidator = async (
  {phone, email, name, password}: IUser,
  {
    email_required = false, // if email is required
    name_required = false, // if name is required
  }: {email_required: boolean; name_required: boolean}
) => {
  const phone_error = await phoneValidator(phone)
  const email_error = await mailValidator(email, email_required)
  const name_error = await nameValidator(name, name_required)
  const password_error = await passwordValidator(password)
  const has_error =
    !!phone_error || !!email_error || !!name_error || !!password_error
  startupDebugger('error is:', {
    phone_error,
    email_error,
    name_error,
    password_error,
    has_error,
  })
  return has_error
    ? {
        phone_error,
        email_error,
        name_error,
        password_error,
      }
    : null
}
