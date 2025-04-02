'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export interface ResetPasswordParams {
  token: string
  password: string
}

export interface ResetPasswordResponse {
  success: boolean
  error?: string
}

export async function resetPassword({ token, password }: ResetPasswordParams): Promise<ResetPasswordResponse> {
  const payload = await getPayload({ config })

  try {
    await payload.resetPassword({
      collection: 'customers',
      data: {
        token,
        password
      },
      overrideAccess: true
    })

  } catch (e) {
    console.log('Password reset error: ', e)
    return { success: false, error: 'An error occurred' }
  }
  return { success: true }
}
