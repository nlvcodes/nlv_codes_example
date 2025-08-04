'use client'
import {EmailFieldErrorClientComponent} from 'payload'
import {useField} from '@payloadcms/ui'

export const Error: EmailFieldErrorClientComponent = ({path, message}) => {
  const {showError} = useField({path: path!})

  if (showError) {
    return <div className={`error`}>
      <p>Error: {message}</p>
    </div>
  } {
    return null
  }

}