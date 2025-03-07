'use client'
import type {EmailFieldErrorClientComponent} from 'payload'
import {useField} from '@payloadcms/ui'

export const Error: EmailFieldErrorClientComponent = ({ path }) => {

  const { value, showError } = useField({ path: path! })

  if (showError) {
    return <div className={'error'}>
      <p>Error: {value as string} is not a valid email address.</p>
    </div>
  } else {
    return null
  }
}