import { User } from 'models/user'
import { Roles, UniqueItem } from '~types/auth/user'

// check user registered before by unique element
export const findUser = async (unique_item: UniqueItem, item: string) => {
  switch (unique_item) {
    case UniqueItem.PHONE:
      return await User.findOne({ phone: item })
    case UniqueItem.EMAIL:
      return await User.findOne({ email: item })
    case UniqueItem.NAME:
      return await User.findOne({ name: item })
    default:
      return null
  }
}

export const findAdmins = async () => {
  return await User.find({ roles: { $in: [Roles.ADMIN] } })
}
