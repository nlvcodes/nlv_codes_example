// we'll want to import our type Section as SectionProps so we can name our exported constant Section
import type {Section as SectionProps} from '@/payload-types'
// and we'll also need our Row component, which we already created
import { Row } from '@/blocks/Row/Component'

// export a constant called Section with the SectionProps type assigned to its props
export const Section = (props: SectionProps) => {

  // all we need is row and bg from our SectionProps, but since we'll be using a different row later on, we'll change its name to rows.
  // It is an array after all
  const { row: rows, bg } = props

  // similar to our Column Component, we'll create a variant for our background color classes that
  // are stored in Payload CMS
  const bgColorVariants = {
    'bg-primary': 'bg-emerald-50 dark:bg-emerald-950 text-emerald-950 dark:text-emerald-200',
    'bg-secondary': 'bg-blue-50 dark:bg-blue-950 text-blue-950 dark:text-blue-200',
    'bg-black': 'bg-gray-800 text-gray-50',
    'bg-white': 'bg-white text-gray-950',
  }


  // now we can return a section element with two classes. the first is my-0, which removes the
  // default margin from the section element. the second is our bgColorVariants object, which will
  // take the value from our CMS to return the correct class name. If none is provided, it will
  // default to the bg-white variant
  return <section className={`${bgColorVariants[bg || 'bg-white']} my-0`}>
    {/* then we can map through our rows. we'll name our item 'row' and return a Row component.
    this component will take all the row props and have a key of row.id */}
    {rows?.map((row) => <Row key={row.id} {...row} />)}
  </section>
}