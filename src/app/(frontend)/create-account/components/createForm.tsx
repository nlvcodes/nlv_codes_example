'use client'

import React, { ReactElement, useState } from 'react'
import { useRouter } from 'next/navigation'
import SubmitButton from '@/components/components/SubmitButton'
import { create, CreateResponse } from '../actions/create'
import Link from 'next/link'

export default function CreateForm(): ReactElement {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setIsPending(true)
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
      setIsPending(false)
      return
    }

    const result: CreateResponse = await create({ email, password, lastName, firstName, username })

    setIsPending(false)

    if (result.success) {
      router.push('/dashboard')
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
          <div className={`flex flex-col gap-2`}>
            <label htmlFor={`firstName`}>First Name</label>
            <input required className={`w-full textInput`} id={`firstName`} name={`firstName`} type={`firstName`}
                   placeholder={`Enter your first name`} />
          </div>
          <div className={`flex flex-col gap-2`}>
            <label htmlFor={`lastName`}>Last Name</label>
            <input className={`w-full textInput`} id={`lastName`} name={`lastName`} type={`lastName`}
                   placeholder={`Enter your last name`} />
          </div>
        </div>
        <div className={`flex flex-col gap-2`}>
          <label htmlFor={`email`}>Email</label>
          <input required className={`w-full textInput`} id={`email`} name={`email`} type={`email`}
                 placeholder={`Enter your email`} />
        </div>
        <div className={`flex flex-col gap-2`}>
          <label htmlFor={`username`}>Username</label>
          <input required className={`w-full textInput`} id={`username`} name={`username`} type={`username`}
                 placeholder={`Enter your username`} />
        </div>
        <div className={`flex flex-col gap-2 mb-2`}>
          <label htmlFor={`password`}>Password</label>
          <input required className={`w-full textInput`} id={`password`} name={`password`} type={`password`}
                 placeholder={`Enter your password`} />
        </div>
        <div className={`flex flex-col gap-2 mb-4`}>
          <label htmlFor={`confirmPassword`}>Confirm Password</label>
          <input required className={`w-full textInput`} id={`confirmPassword`} name={`confirmPassword`}
                 type={`password`} placeholder={`Confirm your password`} />
        </div>
        {error && <div className={`text-red-400`}>{error}</div>}
        <SubmitButton loading={isPending} text={`Create account`} />
      </form>
      <div className={`mt-4`}>
        <p className={`text-sm text-emerald-950/50`}>Already have an account? <Link
          className={`underline underline-offset-4`} href={`/login`}>Login here.</Link></p>
      </div>
    </div>
  </div>

}