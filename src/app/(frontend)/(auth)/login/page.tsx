import { headers as getHeaders } from 'next/headers.js'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import config from '@payload-config'
import { RenderParams } from '../components/RenderSearchParams'
import { LoginForm } from './LoginForm'

export default async function Login() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect(`/account?message=${encodeURIComponent('You are already logged in.')}`)
  }

  return (
    <main
      // className={classes.login}
    >
      <RenderParams
        // className={classes.params}
      />
      <h1>Log in</h1>
      <LoginForm />
    </main>
  )
}