import jwt from 'jsonwebtoken'
import mongoose, { Document, Schema } from 'mongoose'
import config from 'config'
import { t } from 'subscribers/i18next'
import { USERNAME_MAXLENGTH, USERNAME_MINLENGTH, Roles } from '~types/auth/user'

export interface IUserSchema extends Document {
  username: string
  password: string
  deposit: number
  roles: Roles[]
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
  username: {
    type: String,
    minLength: [
      USERNAME_MINLENGTH,
      t('errors:user.USERNAME_MINLENGTH', { number: USERNAME_MINLENGTH }),
    ],
    maxLength: [
      USERNAME_MAXLENGTH,
      t('errors:user.USERNAME_MAXLENGTH', { number: USERNAME_MAXLENGTH }),
    ],
    unique: [true, t('errors:user.username_unique')],
    required: [true, t('errors:user.username_required')],
  },

  deposite: {
    type: Number,
    enum: [5, 10, 20, 50, 100],
    required: [true, t('errors:user.deposit_required')],
  },

  password: {
    type: String,
    required: [true, t('errors:user.password_required')],
  },

  roles: {
    type: Array,
    required: true,
  },
})
userSchema.methods.generateAuthToken = generateAuthToken
// create user model based on user schema
export const User = mongoose.model<IUserSchema>('User', userSchema)
