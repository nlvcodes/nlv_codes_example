import type {CheckboxField} from '@payloadcms/plugin-form-builder/types'
import type {FieldErrorsImpl, FieldValues, UseFormRegister} from 'react-hook-form'
import {useFormContext} from 'react-hook-form'
import {Checkbox as CheckboxUi} from './icon'
import React from 'react'
import {Error} from '../Error'
import {Width} from '../Width'

export const Checkbox: React.FC<
  CheckboxField & {
  errors: Partial<FieldErrorsImpl>
  register: UseFormRegister<FieldValues>
} & {width: string}
> = ({name, defaultValue, errors, label, register, required: requiredFromProps, width}) => {
  const props = register(name, {required: requiredFromProps})
  const {setValue} = useFormContext()

  return (
    <Width width={width}>
      <div className={`flex items-center gap-2`}>
        <CheckboxUi
        defaultChecked={defaultValue}
        id={name}
        onCheckedChange={(checked) => {setValue(props.name, checked)}}
        {...props}
        />
        <label htmlFor={name}>
          {requiredFromProps && (
            <span className={`text-red-800 ms-1`}>* <span className={`sr-only`}>(required)</span></span>
          )}
          {label}
        </label>
      </div>
      {errors[name] && <Error name={name} />}
    </Width>
  )
}