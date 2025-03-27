'use client'

import React, { ReactElement, useState } from 'react'
import { useRouter } from 'next/navigation'
import SubmitButton from '@/components/components/SubmitButton'
import { login, LoginResponse } from '@/app/(frontend)/login/actions/login'
import Link from 'next/link'

export default function LoginForm(): ReactElement {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsPending(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const result: LoginResponse = await login({ email, password })

    setIsPending(false)

    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || "An error occurred.")
    }
  }

  return <div className={`flex gap-8 min-h-full flex-col justify-center items-center`}>
    <div>
      <h1>Login</h1>
    </div>
    <div className={`w-full mx-auto sm:max-w-sm`}>
      <form className={`flex flex-col gap-4`} onSubmit={handleSubmit}>
        <div className={`flex flex-col gap-2`}>
          <label htmlFor={`email`}>Email</label>
          <input className={`w-full textInput`} id={`email`} name={`email`} type={`email`} placeholder={`Enter your email`} />
        </div>
        <div className={`flex flex-col gap-2 mb-4`}>
          <label htmlFor={`password`}>Password</label>
          <input className={`w-full textInput`} id={`password`} name={`password`} type={`password`} placeholder={`Enter your password`} />
        </div>
        {error && <div className={`text-red-400`}>{error}</div>}
        <SubmitButton loading={isPending} text={`Login`} />
      </form>
      <div className={`mt-4`}>
        <p className={`text-sm text-emerald-950/50`}>Don't have an account? <Link className={`underline underline-offset-4`} href={`/create-account`}>Create one here.</Link></p>
      </div>
    </div>
  </div>

}