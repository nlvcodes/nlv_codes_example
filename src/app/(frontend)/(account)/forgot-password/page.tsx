import React from 'react'
import ForgotForm from './components/ForgotPasswordForm'

export const Page = () => {
  return <div className={`h-[100vh] w-full mx-auto sm:max-w-sm`}>
    <div className={`flex justify-center mt-8`}>
      <ForgotForm />
    </div>
  </div>
}

export default Page