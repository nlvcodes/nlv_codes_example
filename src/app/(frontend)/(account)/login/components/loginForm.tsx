'use client'

import React, { ReactElement, useState } from 'react'
import { useRouter } from 'next/navigation'
import SubmitButton from '@/components/CustomerForm/SubmitButton'
import { Input } from '@/components/CustomerForm/Input'
import { login, LoginResponse } from '../../login/actions/login'
import Link from 'next/link'
import { FormContainer } from '@/components/CustomerForm/FormContainer'

export default function LoginForm(): ReactElement {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const result: LoginResponse = await login({ email, password })

    setIsLoading(false)

    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'An error occurred.')
    }
  }

  return <FormContainer heading={'Login'}>
    <form className={`flex flex-col gap-4`} onSubmit={handleSubmit}>
      <Input label={'Email'} name={'email'} type={'email'} />
      <Input label={'Password'} name={'password'} type={'password'} />
      {error && <div className={`text-red-400`}>{error}</div>}
      <SubmitButton loading={isLoading} text={`Login`} />
    </form>
    <div className={`mt-4`}>
      <p className={`text-sm text-emerald-950/50`}>Don&#39;t have an account? <Link
        className={`underline underline-offset-4`} href={`/create-account`}>Create one here.</Link></p>
    </div>
    <div className={`mt-4`}>
      <Link className={`text-emerald-950/50 underline underline-offset-4`} href={`/forgot-password`}>Forgot
        password?</Link>
    </div>
  </FormContainer>

}