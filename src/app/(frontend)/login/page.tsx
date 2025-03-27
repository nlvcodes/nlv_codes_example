import React from 'react'
import LoginForm from '@/app/(frontend)/login/components/loginForm'
import { getUser } from '@/app/(frontend)/(auth)/actions/getUser'
import { redirect } from 'next/navigation'


export default async function Page(): Promise<React.ReactElement> {
  // const user = await getUser()
  // if (user) {
  //   redirect('/dashboard')
  // }

  return <div className={`h-[calc(100vh-50px)]`}>
    <LoginForm />
  </div>
}