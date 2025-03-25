import type {Access} from 'payload'
import { checkRole } from './checkRole'
import { User } from '@/payload-types'

const admin: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin'], user as User)) {
      return true
    }
  }

  return false
}

export default admin