import React from 'react'

export const FormContainer = ({children, heading}: {children: React.ReactNode, heading: string}) => {
  return <div className={`flex gap-8 min-h-full flex-col justify-center items-center`}>
    <div>
      <h1>{heading}</h1>
    </div>
    <div className={`w-full mx-auto sm:max-w-sm`}>
      {children}
    </div>
  </div>
}