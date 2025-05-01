'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'

export const Error = ({ name }: { name: string }) => {
  const {
    formState: { errors },
  } = useFormContext()
  return (
    <div className="mt-2 text-red-400 text-sm">
      {(errors[name]?.message as string) || 'This field is required'}
    </div>
  )
}