import type {Access} from 'payload'
import { checkRole } from './checkRole'
import type {User} from '@/payload-types'

const editor: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin', 'editor'], user as User)) {
      return true
    }
  }

  return false
}

export default editor