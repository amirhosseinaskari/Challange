import jwt from 'jsonwebtoken'
import mongoose, { Document, Schema } from 'mongoose'
import config from 'config'
import { t } from 'subscribers/i18next'
import { NAME_MAXLENGTH, NAME_MINLENGTH, Roles } from '~types/auth/user'
export interface IUserSchema extends Document {
  name: string
  phone: string
  password: string
  email: string
  smsVerificationCode: string
  emailVerificationCode: string
  emailVerified: boolean
  phoneVerified: boolean
  roles: Roles[]
  register_date: Date
  generateAuthToken: Function
}

const generateAuthToken = async function () {
  const token = jwt.sign(
    { id: this._id, status: this.status, roles: this.roles },
    config.get('auth.jwt_private_key')
  )
  return token
}
// user schema
export const userSchema = new Schema({
  name: {
    type: String,
    minLength: [
      NAME_MINLENGTH,
      t('errors:user.name_minLength', { number: NAME_MINLENGTH }),
    ],
    maxLength: [
      NAME_MAXLENGTH,
      t('errors:user.name_maxLength', { number: NAME_MAXLENGTH }),
    ],
    match: [/[a-zA-Z\u0600-\u06FF\s]/, t('errors:user.name')],
  },

  phone: {
    type: String,
    unique: [true, t('errors:user.phone_unique')],
    required: [true, t('errors:user.phone_required')],
    match: [/^[0][9][0-9]{9}$/, t('errors:user.phone_number')], // pattern for iranian mobile number
  },

  smsVerificationCode: {
    type: String,
  },

  emailVerificationCode: {
    type: String,
  },

  email: {
    type: String,
    unique: [true, t('errors:user.mail_unique')],
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, t('errors:user.mail')],
  },

  expirationDate: {
    type: Date,
  },

  password: {
    type: String,
    required: [true, t('errors:user.password_required')],
  },

  emailVerified: {
    type: Boolean,
  },

  phoneVerified: {
    type: Boolean,
  },

  roles: {
    type: Array,
    required: true,
  },

  register_date: {
    type: Date,
    required: true,
  },
})
userSchema.methods.generateAuthToken = generateAuthToken
// create user model based on user schema
export const User = mongoose.model<IUserSchema>('User', userSchema)
