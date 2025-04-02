'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

interface ForgotPasswordParams {
  email: string
}

export interface ForgotPasswordResponse {
  success: boolean
  error?: string
}

export async function resetPassword({ email }: ForgotPasswordParams): Promise<ForgotPasswordResponse> {
  const payload = await getPayload({ config })

  try {
    await payload.forgotPassword({
      collection: 'customers',
      data: {
        email,
      },
    })

  } catch (e) {
    console.log('Forgot password error: ', e)
    return { success: false, error: 'An error occurred' }
  }
  return { success: true }
}
