'use client'

import React, {ReactElement, useState} from 'react'
import {useRouter} from 'next/navigation'
import SubmitButton from '@/components/CustomerForm/SubmitButton'
import {Input} from '@/components/CustomerForm/Input'
import {FormContainer} from '@/components/CustomerForm/FormContainer'
import {resetPassword} from '../actions/resetPassword'
import {Response} from '../../create-account/actions/create'

export default function ResetForm({token}: {token: string}): ReactElement {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)

    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    const result: Response = await resetPassword({token, password})

    setIsLoading(false)

    if (result.success) {
      router.push(`/login?message=${encodeURIComponent('Password reset successful. Login with your new password')}`)
    } else {
      setError(result.error || 'An error occurred.')
    }
  }

  return <FormContainer heading={'Reset your password'}>
    <div className={`w-full mx-auto sm:max-w-sm`}>
      <form
        className={`flex flex-col gap-4`}
        onSubmit={handleSubmit}
      >
        <Input label={'Password'} name={'password'} type={'password'} />
        <Input label={'Confirm password'} name={'confirmPassword'} type={'password'} />
        {error && <div className="text-red-400">{error}</div>}
        <SubmitButton loading={isLoading} text={'Reset password'} />
      </form>
    </div>
  </FormContainer>

}