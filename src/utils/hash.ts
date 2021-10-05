import {genSalt, hash} from 'bcrypt'

export const hashPass = async (password: string) => {
  const salt = await genSalt(10)
  const hashed_password = await hash(password, salt)
  return hashed_password
}
