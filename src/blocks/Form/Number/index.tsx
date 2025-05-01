import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import React from 'react'
import { Width } from '../Width'
import { FormInput } from '@/blocks/Form/Input'

export const Number: React.FC<
  {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<any & FieldValues>
  } & TextField & { hidden: boolean, width: string, placeholder?: string, label: string }
> = ({ name, errors, label, register, required: requiredFromProps, hidden: hiddenFromProps, width, placeholder }) => {
  return (
    <Width width={width}>
      <FormInput errors={errors} name={name} label={label} type="number" placeholder={placeholder} required={requiredFromProps} hidden={hiddenFromProps} register={register} />
    </Width>
  )
}