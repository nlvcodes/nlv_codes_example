// we'll import our type Text as TextProps so we can name our exported constant Text
import type { Text as TextProps } from '@/payload-types'
// we'll also need our RichText component, which we built in another video
import { RichText } from '@/components/RichText'

// export a constant called Text with the TextProps type assigned to it
export const Text = (props: TextProps) => {
  const { text } = props // we only need text from our TextProps
  // then we can return our RichText component, passing in our text as the data prop.
  // We'll include one Tailwind class to add a bit of margin to the top and bottom
  return <RichText className={'my-2'} data={text} />
}