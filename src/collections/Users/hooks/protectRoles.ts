import type { FieldHook } from 'payload'
import type {User} from '@/payload-types'

export const protectRoles: FieldHook<{id: string} & User> = ({data, req}) => {
  if (req.user?.collection === 'users') {
    const isAdmin = req.user?.roles?.includes('admin')

    if (!isAdmin) {
      return ['user']
    }

    const userRoles = new Set(data?.roles || [])
    userRoles.add('user')
    return [...userRoles]
  }
}