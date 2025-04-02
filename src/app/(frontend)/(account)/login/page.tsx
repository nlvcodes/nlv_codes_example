import React from 'react'
import LoginForm from './components/loginForm'
import { getUser } from '@/app/(frontend)/(auth)/actions/getUser'
import { redirect } from 'next/navigation'

interface SearchParams {
  [key: string]: string | undefined;
}

export default async function Page({searchParams}: {searchParams: SearchParams}): Promise<React.ReactElement> {
  const user = await getUser()
  if (user) {
    redirect('/dashboard')
  }

  const {message} = await searchParams

  return <div className={`h-[100vh] w-full mx-auto sm:max-w-sm`}>
    <div className={`flex justify-center mt-8`}>{message && <p
      className={`w-auto inline-block mx-auto bg-emerald-100 p-4 rounded-md text-emerald-950 border-emerald-950 border`}>{message}</p>}</div>
    <LoginForm />
  </div>
}