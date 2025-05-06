import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type {FieldErrorsImpl, FieldValues, UseFormRegister} from 'react-hook-form'
import React from 'react'
import { Width } from '@/blocks/Form/Width'
import {FormInput} from '../Input'

export const Text: React.FC<
  {
    errors: Partial<FieldErrorsImpl<{[x: string]: any}>>
    register: UseFormRegister<any & FieldValues>
  } & TextField & {hidden: boolean, width: string, placeholder?: string, label: string}> = ({name, errors, label, register, required: requiredFromProps, hidden: hiddenFromProps, width, placeholder}) => {
  return (
    <Width width={width}>
      <FormInput
        errors={errors}
        label={label}
        name={name}
        type={'text'}
        register={register}
        hidden={hiddenFromProps}
        placeholder={placeholder}
        required={requiredFromProps}
      />
    </Width>
  )

}