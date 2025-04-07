'use server'

import {cookies} from 'next/headers'
import {Response} from '@/app/(frontend)/(account)/create-account/actions/create'

export async function logout(): Promise<Response> {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('payload-token')

    return {success: true}
  } catch (e) {
    console.log("Logout error: ", e)
    return {success: false, error: 'An error occurred during logout.'};
  }
}