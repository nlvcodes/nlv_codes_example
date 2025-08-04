import React from 'react'
import CreateForm from './components/createForm'
import {getUser} from '@/app/(frontend)/[locale]/(auth)/actions/getUser'
import {redirect} from 'next/navigation'

export default async function Page(): Promise<React.ReactElement> {

  const user = await getUser()
  if (user) {
    redirect(`/dashboard`)
  }

  return <div className={`h-[100vh]`}>
    <CreateForm />
  </div>
}

