import type { TextAreaField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import React from 'react'
import { Error } from '../Error'

export const Textarea: React.FC<
  {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<any & FieldValues>
    rows?: number
  } & TextAreaField
> = ({ name, errors, label, register, required: requiredFromProps, rows = 3 }) => {
  return (
    <div className={`w-full`}>
      <div className={`relative mb-4`}>
        <label className={`mb-4 block`} htmlFor={name}>
          {label}{requiredFromProps ? <span className={'ms-1 text-red-800'}>*</span> : ''}
        </label>
        <textarea
          className={`w-full bg-white text-emerald-950 border border-emerald-950 rounded-md p-2 leading-tight`}
          id={name}
          rows={rows}
          {...register(name, { required: requiredFromProps })}
        />
        {errors[name] && <Error name={name} />}
      </div>
    </div>
  )
}