'use client'
import {TextFieldClientProps} from 'payload'
import {useField} from '@payloadcms/ui'

type Props = {defaultLength: number} & TextFieldClientProps

export const TitleDescription = (props: Props) => {
  const {path, field, defaultLength} = props
  const {value} = useField({path: props.path})
  const maxLength = field.maxLength || defaultLength
  const text = value as string

  return <div>{maxLength- text.length} of {maxLength} characters left.</div>


}