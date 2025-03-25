import type { Access } from 'payload'
import { checkRole } from './checkRole'
import { User } from '@/payload-types'

const user: Access = ({ req: { user } }) => {
  if (user?.collection === 'users') {
    if (checkRole(['admin', 'editor'], user as User)) {
      return true
    }

    return {
      id: { equals: user.id },
    }
  } else if (user?.collection === 'customers') {
    return {
      id: { equals: user.id },
    }
  }

  return false
}

export default user