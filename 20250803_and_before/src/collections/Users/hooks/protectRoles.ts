import type { FieldHook} from 'payload'
import type {User} from '@/payload-types'

export const protectRoles: FieldHook<{id: string} & User> = ({req, data}) => {
  if (req.user?.collection === 'users') {
    const isAdmin = req.user?.roles?.includes('admin')

    if (!isAdmin) {
      // NOTE: The code in the video doesn't include this line. This is added because whenever the editor profile got updated,
      // 'editor' was removed
      if (!data?.roles?.includes('editor')) {
        return ['user']
      }
    }


    const userRoles = new Set(data?.roles || [])
    userRoles.add('user')
    return [...userRoles]
  }
}