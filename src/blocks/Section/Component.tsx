import type {Section as SectionProps} from '@/payload-types'

type Props = SectionProps

export const Section = (props: Props) => {

  const { row, bg } = props
  let bgColor
  switch (bg) {
    case 'bg-primary':
      bgColor = 'bg-emerald-50 dark:bg-emerald-950 text-emerald-950 dark:text-emerald-200'
      break
    case 'bg-secondary':
      bgColor = 'bg-blue-50 dark:bg-blue-950 text-blue-950 dark:text-blue-200'
      break
    case 'bg-black':
      bgColor = 'bg-gray-800 text-gray-50'
      break
    case 'bg-white':
      bgColor = 'bg-white text-gray-950'
      break
  }

  return <section className={bgColor}>

  </section>
}