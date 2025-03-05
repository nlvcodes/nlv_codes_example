'use client'
import { useField } from '@payloadcms/ui'
import { TextFieldClientComponent } from 'payload'

export const CustomTextField: TextFieldClientComponent = (props) => {
  const { value, setValue } = useField({ path: props.path })


  return <div>
    <label htmlFor="field-slug">Slug</label>
    <input
      style={{
        background: 'pink',
      }}
      onChange={(e) => setValue(e.target.value)}
      value={value as string}
      id={'field-slug'}
    />
  </div>
}