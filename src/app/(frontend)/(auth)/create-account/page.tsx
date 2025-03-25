import { headers as getHeaders } from 'next/headers.js'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import React, { Fragment } from 'react'
import config from '@payload-config'
import { RenderParams } from '../components/RenderSearchParams'
import { CreateAccountForm } from './CreateAccountForm'

export default async function CreateAccount() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect(
      `/account?message=${encodeURIComponent(
        'Cannot create a new account while logged in, please log out and try again.',
      )}`,
    )
  }

  return (
    <main
      // className={classes.createAccount}
    >
      <h1>Create Account</h1>
      <RenderParams />
      <CreateAccountForm />
    </main>
  )
}