'use client'

import type { Permissions } from 'payload'
import React, { createContext, useCallback, use, useEffect, useState } from 'react'
import type { Customer } from '@/payload-types'
import type { AuthContext, Create, ForgotPassword, Login, Logout } from './types'
import { rest } from '@/app/(frontend)/(auth)/components/providers/rest'

const Context = createContext({} as AuthContext)

export const AuthProvider: React.FC<{ api?: 'rest'; children: React.ReactNode }> = ({ api = 'rest', children, }) => {
  const [user, setUser] = useState<null | Customer>()
  const [permissions, setPermissions] = useState<null | Permissions>(null)

  const create = useCallback<Create>(
    async (args) => {
      if (api === 'rest') {
        const customer = await rest(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/customers`, args)
        setUser(customer)
        return customer
      }
    }, [api],
  )

  const login = useCallback<Login>(
    async (args) => {
      if (api === 'rest') {
        const customer = await rest(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/customers/login`, args)
        setUser(customer)
        return customer
      }
    }, [api],
  )

  const logout = useCallback<Logout>(async () => {
    if (api === 'rest') {
      await rest(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/customers/logout`)
      setUser(null)
      return
    }
  }, [api])

  useEffect(() => {
    const fetchMe = async () => {
      if (api === 'rest') {
        const user = await rest(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/customers/me`,
          {},
          {
            method: 'GET',
          },
        )
        setUser(user)
      }
    }
    void fetchMe()
  }, [api])

  const forgotPassword = useCallback<ForgotPassword>(
    async (args) => {
      if (api === 'rest') {
        const user = await rest(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/customers/forgot-password`,
          args,
        )
        setUser(user)
        return user
      }
    },
    [api],
  )


  return (
    <Context value={{
      create,
      login,
      setUser,
      logout,
      permissions,
      setPermissions,
      forgotPassword,
      user,
    }}>
      {children}
    </Context>
  )
}

type useAuth<T = Customer> = () => AuthContext

export const useAuth: useAuth = () => use(Context)