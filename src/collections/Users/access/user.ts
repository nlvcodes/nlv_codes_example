import type {Access} from 'payload'
import {checkRole} from './checkRole'

const user: Access = ({req: {user}}) => {
  if (user) {
    if (checkRole(['admin', 'editor'], user)) {
      return true
    }

    return { id: {equals: user.id}}
  }

  return false

}

export default user