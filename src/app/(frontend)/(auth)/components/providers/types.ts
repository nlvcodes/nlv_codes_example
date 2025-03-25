import type { Permissions } from 'payload'

import type { Customer as User } from '@/payload-types'


export type ResetPassword = (args: {
  password: string
  passwordConfirm: string
  token: string
}) => Promise<User>

export type ForgotPassword = (args: { email: string }) => Promise<User | undefined | null>

export type Create = (args: {
  email: string
  firstName: string
  lastName: string
  password: string
}) => Promise<User | undefined | null>

export type Login = (args: { email: string; username?: string; password: string }) => Promise<User | undefined | null>

export type Logout = () => Promise<void>

export interface AuthContext {
  create: Create
  forgotPassword: ForgotPassword
  login: Login
  logout: Logout
  permissions?: null | Permissions
  // resetPassword: ResetPassword
  setPermissions: (permissions: null | Permissions) => void
  setUser: (user: null | User) => void
  user?: null | User
}