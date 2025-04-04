import type { FieldHook} from 'payload'
import type {User} from '@/payload-types'

export const protectRoles: FieldHook<{id: string} & User> = ({req, data}) => {
  const isAdmin = req.user?.roles?.includes('admin')

  if (!isAdmin) {
    return ['user']
  }

  // NOTE: this removes all permissions for our editor user when their profile is updated

  const userRoles = new Set(data?.roles || [])
  userRoles.add('user')
  return [...userRoles]
}