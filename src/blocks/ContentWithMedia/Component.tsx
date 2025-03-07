import type { ContentWithMedia as ContentWithMediaProps } from '@/payload-types'
import Image from 'next/image'
import { RichText } from '@/components/RichText'

type Props = {
  className?: string
} & ContentWithMediaProps

export const ContentWithMedia: React.FC<Props> = (block) => {
  return <section className={'grid grid-cols-12 gap-4 m-4 p-[6rem] bg-[#afa] rounded-2xl dark:bg-emerald-950 dark:text-emerald-50'}>
    {block.content
      && <RichText data={block.content} className={`col-span-12 order-last md:col-span-3 ${block.textPosition === 'Right' 
        ? `md:order-last` 
        : `md:order-first`}`}
      />
    }
    {block.image
      && typeof block.image !== 'string'
      && <Image
        src={block.image.thumbnailURL || ``} alt={block.image.alt || ``}
        className={'col-span-12 md:col-span-9 blur-sm grayscale'}
        width={block.image.width || 640}
        height={block.image.height || 360}
      />
    }
  </section>

}
