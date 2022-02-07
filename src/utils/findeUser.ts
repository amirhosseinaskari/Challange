import { User } from 'models/user'
import { Roles } from '~types/auth/user'

// check username. did this username use before
export const findUser = async (username: string) => {
  return await User.findOne({ username: { $eq: username } })
}

export const findBuyers = async () => {
  return await User.find({ roles: { $in: [Roles.BUYER] } })
}

export const findSellers = async () => {
  return await User.find({ roles: { $in: [Roles.SELLER] } })
}
