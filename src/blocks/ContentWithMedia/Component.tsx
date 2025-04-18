import type { ContentWithMedia as ContentWithMediaProps } from '@/payload-types'
import Image from 'next/image'
import {RichText} from '@/components/RichText'

type Props = {
  className?: string
} & ContentWithMediaProps

export const ContentWithMedia: React.FC<Props> = (block) => {
    return <div>
      <section
        className={`grid grid-cols-12 gap-4 m-4 p-4 bg-emerald-200 text-emerald-950 rounded-md`}>
        {block.content && <RichText className={`col-span-4 ${block.textPosition === 'Right' ? 'order-last' : 'order-first'}`}
          data={block.content} />}
        {block.image && typeof block.image !== 'string' &&
          <Image id={'test'} className={`col-span-8 rounded-md aspect-video`}
                 src={`${process.env.S3}/${block.image.filename}` || ``} alt={block.image.alt || ``}
                 width={block.image.width || 640} height={block.image.height || 360}
          />}
      </section>
    </div>
}