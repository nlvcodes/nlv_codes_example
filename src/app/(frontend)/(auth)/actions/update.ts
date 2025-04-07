'use server'

import {getPayload} from 'payload'
import config from '@payload-config'
import {getUser} from '../actions/getUser'
import type {Customer} from '@/payload-types'
import {Response} from '../../(account)/create-account/actions/create'

interface UpdateParams {
  email: string
  firstName: string
  lastName?: string
}

export async function update({email, firstName, lastName}: UpdateParams): Promise<Response> {
  const payload = await getPayload({config})
  const user = await getUser() as Customer

  try {
    await payload.update({
      collection: 'customers',
      id: user.id,
      data: {email, firstName, lastName}
    })
  } catch (e) {
    console.log('Update error: ', e)
    return {success: false, error: 'An error occurred'};
  }

  return {success: true}
}