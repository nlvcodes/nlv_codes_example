import React from 'react'
import { getUser } from '../../(auth)/actions/getUser'
import { redirect } from 'next/navigation'
import ResetForm from './components/resetPasswordForm'

interface SearchParams {
  [key: string]: string | undefined;
}

export default async function Page({searchParams}: {searchParams: SearchParams}): Promise<React.ReactElement> {
  const user = await getUser()
  if (user) {
    redirect('/dashboard')
  }

  const {message, token} = await searchParams

  if (token) {
    return <div className={`h-[100vh] w-full mx-auto sm:max-w-sm`}>
      <div className={`flex justify-center mt-8`}>{message && <p
        className={`w-auto inline-block mx-auto bg-emerald-100 p-4  text-emerald-950 border-emerald-950 border rounded-md`}>{message}</p>}</div>
      <ResetForm token={token} />
    </div>
  } else {
    redirect(`/login?message=${encodeURIComponent('No reset token found')}`)
  }
}