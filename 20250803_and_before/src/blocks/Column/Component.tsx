import type {Column as ColumnProps} from '@/payload-types'
import {RenderBlocks} from '@/blocks'

export const Column = (props: ColumnProps) => {
  const {columnWidth, content} = props

  const basisVariant = {
    // this is a less explicit (read: sleeker) way to do the same thing as the commented-out code below
    [props.columnWidth]: `lg:basis-${columnWidth}`,

    // 'auto': 'lg:basis-auto',
    // '4/5': 'lg:basis-4/5',
    // '3/4': 'lg:basis-3/4',
    // '2/3': 'lg:basis-2/3',
    // '1/2': 'lg:basis-1/2',
    // '1/3': 'lg:basis-1/3',
    // '1/4': 'lg:basis-1/4',
    // '1/5': 'lg:basis-1/5',
  }

  return <div className={`flex flex-col grow basis-full sm:basis-1/2 ${basisVariant[columnWidth]}`}>
    <RenderBlocks blocks={content} />
  </div>

}