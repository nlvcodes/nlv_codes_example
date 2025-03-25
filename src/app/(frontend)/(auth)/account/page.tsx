import { headers as getHeaders } from 'next/headers.js'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import React, { Fragment } from 'react'
import config from '@payload-config'
import { Button } from '../components/Button'
import { HydrateClientUser } from '../components/HydrateCustomer'
import { RenderParams } from '../components/RenderSearchParams'
import { AccountForm } from './AccountForm'

export default async function Account() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { permissions, user } = await payload.auth({ headers })


  if (!user) {
    redirect(
      `/login?error=${encodeURIComponent('You must be logged in to access your account.')}&redirect=/account`,
    )
  }

  return (
    <Fragment>
      {/*<HydrateClientUser permissions={permissions} user={user} />*/}
      <main
        // className={classes.account}
      >
        <RenderParams
          // className={classes.params}
        />
        <h1>Account</h1>
        <AccountForm />
        <Button appearance="secondary" href="/logout" label="Log out" />
      </main>
    </Fragment>
  )
}