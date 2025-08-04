import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { Error } from '../Error'
import React from 'react'

type Props = {
  errors: Partial<FieldErrorsImpl<{ [x: string]: any }>>
  label: string
  name: string
  type: 'text' | 'number' | 'email' | 'tel'
  placeholder?: string
  required?: boolean
  defaultValue?: string
  hidden?: boolean
  register: UseFormRegister<any & FieldValues>
}

export const FormInput = (props: Props) => {

  let pattern
  switch (props.type) {
    case 'text':
    case 'number':
      pattern = { required: props.required }
      break
    case 'tel':
      pattern = {
        required: props.required, pattern: {
          message: 'Please format your phone number like this: (555) 555-5555 or +1 555 555-5555',
          value: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        },
      }
      break
    case 'email':
      pattern = {
        required: props.required, pattern: {
          message: 'Please enter a valid email address',
          value: /^\S[^\s@]*@\S+$/,
        },
      }
      break
  }

  return <div className={props.hidden ? 'hidden' : `flex flex-col gap-2`}>
    <label htmlFor={props.name}>
      {props.required ?
        <span className={`ms-1 text-red-800`}>* <span className={`sr-only`}>(required)</span></span> : ''}
      {props.label}
    </label>
    <input
      required={props.required}
      className={`w-full bg-white text-emerald-950 border border-emerald-950 rounded-md p-2 leading-tight`}
      id={props.name}
      {...props.register(props.name, pattern)}
      placeholder={props.placeholder ? props.placeholder : `Enter your ${props.label.toLowerCase()}`}
      type={props.type}
      defaultValue={props.defaultValue ? props.defaultValue : ''}
      hidden={props.hidden}
    />
    {props.errors[props.name] && <Error name={props.name} />}
  </div>
}