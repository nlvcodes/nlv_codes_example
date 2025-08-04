import type {Access} from 'payload'
import {checkRole} from './checkRole'

const admin: Access = ({req: {user}}) => {
  if (user) {
    if (checkRole(['admin'], user)) {
      return true
    }
  }

  return false

}

export default admin