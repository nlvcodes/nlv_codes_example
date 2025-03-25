import { headers as getHeaders } from 'next/headers.js'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import config from '@payload-config'
import { ResetPasswordForm } from './ForgotPasswordForm'

export default async function ResetPassword() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect(`/account?message=${encodeURIComponent('Cannot reset password while logged in.')}`)
  }

  return (
    <main
      // className={classes.resetPassword}
    >
      <h1>Reset Password</h1>
      <p>Please enter a new password below.</p>
      <ResetPasswordForm />
    </main>
  )
}