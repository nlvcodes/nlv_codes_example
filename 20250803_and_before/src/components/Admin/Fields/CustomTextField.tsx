'use client'
import {TextFieldClientComponent} from 'payload'
import {useField} from '@payloadcms/ui'

export const CustomTextField: TextFieldClientComponent = (props) => {
  const {value, setValue} = useField({path: props.path})

  return <div>
    <label htmlFor={`field-slug`}>Slug</label>
    <input style={{ background: 'red' }} onChange={(e) => setValue(e.target.value)} value={value as string}
                   id={'field-slug'} /></div>
}
