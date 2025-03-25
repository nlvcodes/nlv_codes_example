'use client'

import Link from 'next/link'
import {useRouter, useSearchParams} from 'next/navigation'
import React, { useCallback, useRef, useState } from 'react'
import {useForm} from 'react-hook-form' // note for video, need to install

import {useAuth} from '../components/providers'
import { Message } from '../components/Message'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { rest } from '@/app/(frontend)/(auth)/components/providers/rest'

type FormData = {
  email: string,
  password: string,
  passwordConfirm: string,
  username?: string,
}

export const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const { login } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const {
    formState: {errors},
    handleSubmit,
    register,
    watch
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = useCallback(
    async (data: FormData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/customers`, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
      })

      if (!response.ok) {
        const message = response.statusText || 'There was an error creating the account.'
        setError(message)
        return
      }

      const redirect = searchParams.get('redirect')

      const timer = setTimeout(() => {
        setLoading(true)
      }, 1000)

      try {
        await login(data)
        // await rest(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/customers/login`, data)
        clearTimeout(timer)
        if (redirect) {router.push(redirect)}
        else {router.push(`/account?success=${encodeURIComponent('Account created successfully')}`)}
      } catch (_) {
        clearTimeout(timer)
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router, searchParams]
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Message error={error} />
      <Input
        error={errors.email}
        label={`Email Address`}
        name={`email`}
        register={register}
        required
        type={'email'}
      />
      <Input
        error={errors.username}
        label={`Username`}
        name={`username`}
        register={register}
        required
        type={'text'}
      />
      <Input
        error={errors.password}
        label="Password"
        name="password"
        register={register}
        required
        type="password"
      />
      <Input
        error={errors.passwordConfirm}
        label="Confirm Password"
        name="passwordConfirm"
        register={register}
        required
        type="password"
        validate={(value) => value === password.current || 'The passwords do not match'}
      />
      <Button
        appearance="primary"
        // className={classes.submit}
        label={loading ? 'Processing' : 'Create Account'}
        type="submit"
      />
      <div>
        {'Already have an account? '}
        <Link href={`/login${allParams}`}>Login</Link>
      </div>
    </form>
  )

}