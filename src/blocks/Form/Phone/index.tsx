import type {FieldErrorsImpl, FieldValues, UseFormRegister} from 'react-hook-form'
import React from 'react'
import { Width } from '@/blocks/Form/Width'
import {FormInput} from '../Input'

export const Phone: React.FC<
  {
    errors: Partial<FieldErrorsImpl<{[x: string]: any}>>
    register: UseFormRegister<any & FieldValues>
  } & {hidden: boolean, width: string, placeholder?: string, label: string, name: string, required: boolean}> = ({name, errors, label, register, required: requiredFromProps, hidden: hiddenFromProps, width, placeholder}) => {
  return (
    <Width width={width}>
      <FormInput
        errors={errors}
        label={label}
        name={name}
        type={'tel'}
        register={register}
        hidden={hiddenFromProps}
        placeholder={placeholder}
        required={requiredFromProps}
      />
    </Width>
  )

}