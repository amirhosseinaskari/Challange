import Joi from 'joi'
import {t} from 'subscribers/i18next'
import {
  NAME_MAXLENGTH,
  NAME_MINLENGTH,
  PASS_MAXLENGTH,
  PASS_MINlENGTH,
} from 'types/auth/user'

export const phoneValidator = (phone: string) => {
  const schema = {
    phone: Joi.string()
      .required()
      .message(t('errors:user.phone_required'))
      .pattern(new RegExp(/^[0][9][0-9]{9}$/))
      .message(t('errors:user.phone_number')),
  }

  return Joi.valid({phone}, schema)
}

export const nameValidator = (name: string) => {
  const schema = {
    name: Joi.string()
      .required()
      .message(t('errors.user.name_required'))
      .min(NAME_MINLENGTH)
      .message(t('errors:user.name_minLength', {number: NAME_MINLENGTH}))
      .max(NAME_MAXLENGTH)
      .message(t('errors:user.name_maxLength', {number: NAME_MAXLENGTH}))
      .regex(/[a-zA-Z\u0600-\u06FF\s]g/)
      .message(t('errors:user.name')),
  }

  return Joi.valid({name}, schema)
}

export const passwordValidator = (password: string) => {
  const schema = {
    password: Joi.string()
      .required()
      .message(t('errors.user.password_required'))
      .min(PASS_MINlENGTH)
      .message(t('errors.user.password_minLength'))
      .max(PASS_MAXLENGTH)
      .message(t('errors.user.password_maxLength'))
      .pattern(new RegExp(/^[0-9a-zA-Z&*/$#@!~()%_-+=[]/g))
      .message(t('errors.user.password')),
  }

  return Joi.valid({password}, schema)
}

export const mailValidator = (mail: string) => {
  const schema = {
    mail: Joi.string()
      .required()
      .message(t('errors.user.mail_required'))
      .email()
      .message('errors.user.mail'),
  }

  return Joi.valid({mail}, schema)
}
