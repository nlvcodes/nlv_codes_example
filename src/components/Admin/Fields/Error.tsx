'use client'
import {EmailFieldErrorClientComponent} from 'payload'
import {useField} from '@payloadcms/ui'

// we just need to update our Error component
// add a message argument after our path prop
export const Error: EmailFieldErrorClientComponent = ({path, message}) => {
  const {showError} = useField({path: path!}) // we can remove value from here, but we need to keep showError

  if (showError) {
    return <div className={`error`}>
      <p>Error: {message}</p> {/* we'll change this line to {message} instead of a hardcoded error. */}
    </div>
  } {
    return null
  }

}