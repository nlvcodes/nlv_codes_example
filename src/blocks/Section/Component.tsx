import type {Section as SectionProps} from '@/payload-types'
import {Row} from '@/blocks/Row/Component'

export const Section = (props: SectionProps) => {
  const {row: rows, bg} = props

  const bgColorVariants = {
    'bg-primary': 'bg-emerald-50 dark:bg-emerald-950 text-emerald-950 dark:text-emerald-200',
    'bg-secondary': 'bg-blue-50 dark:bg-blue-950 text-blue-950 dark:text-blue-200',
    'bg-black': 'bg-gray-800 text-gray-50',
    'bg-white': 'bg-white text-gray-950',
  }

  return <section className={`${bgColorVariants[bg || 'bg-white']} my-0`}>
    {rows?.map((row) => <Row key={row.id} {...row} />)}
  </section>
}