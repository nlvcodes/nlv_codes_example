'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'
import type { Customer } from '@/payload-types'

interface LoginParams {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  error?: string
}

export type Result = {
  exp?: number
  token?: string
  user?: Customer
}

export async function login({ email, password }: LoginParams): Promise<LoginResponse> {
  const payload = await getPayload({config})
  try {
    const result: Result = await payload.login({
      collection: 'customers',
      data: {
        email, password
      }
    })

    if (result.token) {
      const cookieStore = await cookies()
      cookieStore.set("payload-token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: '/',
      })

      return { success: true }
    } else {
      return { success: false, error: "Invalid email or password" }
    }
  } catch (e) {
    console.log("Login error: ", e)
    return { success: false, error: "An error occurred." }
  }
}