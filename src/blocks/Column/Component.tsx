import type {Column as ColumnProps} from '@/payload-types' // import this as ColumnProps so we can name our exported constant Column
import { RenderBlocks } from '@/blocks' // need the RenderBlocks component, which we built in another video

export const Column = (props: ColumnProps) => {
  const {columnWidth, content} = props // we only need columnWidth and content from our props

  const basisVariant = { // we create this so tailwind can dynamically generate our flex-basis properties
    'auto': 'lg:basis-auto',
    '4/5': 'lg:basis-4/5',
    '3/4': 'lg:basis-3/4',
    '2/3': 'lg:basis-2/3',
    '1/2': 'lg:basis-1/2',
    '1/3': 'lg:basis-1/3',
    '1/4': 'lg:basis-1/4',
    '1/5': 'lg:basis-1/5',
  }

  return <div className={`flex flex-col grow basis-full sm:basis-1/2 ${basisVariant[columnWidth]} p-4`}>
    {/* We'll make our returned div a flex with a flex-direction of column and grow to fill the
    available space. At the smallest screen size, we'll set the basis to 100% of the screen width.
    Then we'll set the basis to be 1/2 of the screen width at the small screen size. Next, we'll
    use the basisVariant object with [columnWidth] to set the basis to the appropriate value from Payload CMS.
    Lastly, we'll add a rem of padding on all sides */}
    <RenderBlocks blocks={content} /> {/* This will render all the blocks in our content blocks array in the column */}
  </div>
}