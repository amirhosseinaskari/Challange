import mongoose, {Schema} from 'mongoose'
import {t} from 'subscribers/i18next'
import {
  NAME_MAXLENGTH,
  NAME_MINLENGTH,
  PASS_MAXLENGTH,
  PASS_MINlENGTH,
} from '~types/auth/user'

// user schema
export const userSchema = new Schema({
  name: {
    type: String,
    minLength: [
      NAME_MINLENGTH,
      t('errors:user.name_minLength', {number: NAME_MINLENGTH}),
    ],
    maxLength: [
      NAME_MAXLENGTH,
      t('errors:user.name_maxLength', {number: NAME_MAXLENGTH}),
    ],
    match: [/[a-zA-Z\u0600-\u06FF\s]/, t('errors:user.name')],
  },

  phone: {
    type: String,
    unique: [true, t('errors:user.phone_unique')],
    required: [true, t('errors:user.phone_required')],
    match: [/^[0][9][0-9]{9}$/, t('errors:user.phone_number')], // pattern for iranian mobile number
  },

  email: {
    type: String,
    unique: [true, t('errors:user.mail_unique')],
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, t('errors:user.mail')],
  },

  password: {
    type: String,
    required: [true, t('errors:user.password_required')],
    minLength: [
      PASS_MINlENGTH,
      t('errors.password_minLength', {number: PASS_MINlENGTH}),
    ],
    maxLength: [
      PASS_MAXLENGTH,
      t('errors.password_maxLength', {number: PASS_MAXLENGTH}),
    ],
    match: [/[0-9a-zA-Z!@#\$%\^&\*]/, t('errors.password')],
  },

  status: {
    type: Number,
  },
  roles: {
    type: Array,
    required: true,
  },
})

// create user model based on user schema
export const User = mongoose.model('User', userSchema)
