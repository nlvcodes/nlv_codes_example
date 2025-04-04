import type {Access} from 'payload'
import {checkRole} from './checkRole'

const editor: Access = ({req: {user}}) => {
  if (user) {
    if (checkRole(['admin', 'editor'], user)) {
      return true
    }
  }

  return false

}

export default editor