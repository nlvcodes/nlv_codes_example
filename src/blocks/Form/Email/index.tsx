import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import React from 'react'
import { Width } from '../Width'
import { FormInput } from '@/blocks/Form/Input'

export const Email: React.FC<
  {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<any & FieldValues>
  } & EmailField & { hidden: boolean, width: string, placeholder?: string, label: string }
> = ({ name, errors, label, register, required: requiredFromProps, hidden: hiddenFromProps, width, placeholder }) => {
  return (
    <Width width={width}>
      <FormInput errors={errors} name={name} label={label} type="email" placeholder={placeholder} required={requiredFromProps} hidden={hiddenFromProps} register={register} />
    </Width>
  )
}