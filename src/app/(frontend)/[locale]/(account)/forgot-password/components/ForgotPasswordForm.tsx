'use client'

import React, {ReactElement, useState} from 'react'
import {useRouter} from 'next/navigation'
import SubmitButton from '@/components/CustomerForm/SubmitButton'
import {Input} from '@/components/CustomerForm/Input'
import {FormContainer} from '@/components/CustomerForm/FormContainer'
import {ForgotPassword} from '../actions/forgotPassword'
import {Response} from '../../create-account/actions/create'

export default function ForgotForm(): ReactElement {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)

    const email = formData.get('email') as string

    setIsLoading(false)

    const result: Response = await ForgotPassword({ email })

    if (result.success) {
      router.push(`/login?message=${encodeURIComponent('Instructions to reset your password have been emailed to you.')}`)
    } else {
      setError(result.error || 'An error occurred.')
    }
  }

  return <FormContainer heading={'Forgot Password?'}>
    <div className={`w-full mx-auto sm:max-w-sm`}>
      <form onSubmit={handleSubmit}
            className={`flex flex-col gap-4`}
      >
        <Input label={'Email'} name={'email'} type={'email'} />
        {error && <div className="text-red-400">{error}</div>}
        <SubmitButton loading={isLoading} text={'Reset password'} />
      </form>
    </div>
  </FormContainer>

}