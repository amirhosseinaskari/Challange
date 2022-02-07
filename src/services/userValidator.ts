import Joi from 'joi'
import { t } from 'subscribers/i18next'
import {
  USERNAME_MAXLENGTH,
  USERNAME_MINLENGTH,
  PASS_MAXLENGTH,
  PASS_MINlENGTH,
  ILogin,
} from '~types/auth/user'

// username validator => null | error
export const usernameValidator = async (username: string) => {
  const schema = Joi.object({
    username: Joi.string()
      .required()
      .min(USERNAME_MINLENGTH)
      .max(USERNAME_MAXLENGTH)
      .regex(/[A-Za-z\d$@$!%*?&~=.]/)
      .messages({
        'any.required': t('errors:user.username_required'),
        'string.empty': t('errors:user.username_required'),
        'string.min': t('errors:user.username_minLength', {
          number: USERNAME_MINLENGTH,
        }),
        'string.max': t('errors:user.username_maxLength', {
          number: USERNAME_MAXLENGTH,
        }),
        'string.pattern.base': t('errors:user.username'),
      }),
  })
  try {
    const {
      error: { details = [] },
    } = schema.validate({ username: username.trim() })
    return details[0]?.message
  } catch (error) {
    return null
  }
}

// password validator with specific symbols and letters
export const passwordValidator = async (password: string) => {
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

// user validator => username and password
// return error messeges
export const userValidator = async ({ username, password }: ILogin) => {
  const username_error = username && (await usernameValidator(username))
  const password_error = await passwordValidator(password || null)

  const has_error = !!username_error || !!password_error

  return has_error
    ? {
        username_error,
        password_error,
      }
    : null
}
