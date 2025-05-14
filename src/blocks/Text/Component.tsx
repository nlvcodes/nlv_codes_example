import type {Text as TextProps} from '@/payload-types'
import {RichText} from '@/components/RichText'

export const Text = (props: TextProps) => {
  const {text} = props

  return <RichText data={text} className={`my-2`} />
}