'use client'

import React, { ReactElement, useState } from 'react'
import { useRouter } from 'next/navigation'
import SubmitButton from '@/components/FormFields/SubmitButton'
import { create, CreateResponse } from '../actions/create'
import Link from 'next/link'
import { Input } from '@/components/FormFields/Input'

export default function CreateForm(): ReactElement {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setIsLoading(true)
    setError(null)


    const formData = new FormData(event.currentTarget)

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const username = formData.get('username') as string

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    const result: CreateResponse = await create({ email, password, lastName, firstName, username })

    setIsLoading(false)

    if (result.success) {
      router.push(`/login?message=${encodeURIComponent('Check your email to verify your account')}`)
    } else {
      setError(result.error || 'An error occurred.')
    }
  }

  return <div className={`flex gap-8 min-h-full flex-col justify-center items-center`}>
    <div>
      <h1>Create an Account</h1>
    </div>
    <div className={`w-full mx-auto sm:max-w-sm`}>
      <form className={`flex flex-col gap-4`} onSubmit={handleSubmit}>
        <div className={`flex flex-row flex-1/2 gap-2`}>
          <Input label={`First Name`} name={`firstName`} type={'text'} />
          <Input label={`Last Name`} name={`lastName`} type={'text'} />
        </div>
        <Input label={'Email'} type={'email'} name={'email'} />
        <Input label={'Password'} type={'password'} name={'password'} />
        <Input label={'Confirm Password'} type={'password'} name={'confirmPassword'} placeholder={'Confirm your password'} />
        {error && <div className={`text-red-400`}>{error}</div>}
        <SubmitButton loading={isLoading} text={`Create account`} />
      </form>
      <div className={`mt-4`}>
        <p className={`text-sm text-emerald-950/50`}>Already have an account? <Link
          className={`underline underline-offset-4`} href={`/login`}>Login here.</Link></p>
      </div>
    </div>
  </div>

}