import type { ContentWithMedia as ContentWithMediaProps } from '@/payload-types'
import Image from 'next/image'
import {RichText} from '@/components/RichText'

type Props = {
  className?: string
} & ContentWithMediaProps

export const ContentWithMedia: React.FC<Props> = (block) => {
    return <section className="grid grid-cols-12 gap-4 m-4 p-[6rem] bg-emerald-400 rounded-2xl dark:bg-[#afa] dark:text-emerald-50">
      {block.content && <RichText className={`md:col-span-3! col-span-12 order-last ${block.textPosition === 'Right' ? 'md:order-last' : 'md:order-first'}`} data={block.content} />}
      {block.image && typeof block.image !== 'string' &&
        <Image className={'md:col-span-9 col-span-12 blur-sm grayscale'} src={block.image.thumbnailURL || ``} alt={block.image.alt || ``}
        width={block.image.width || 640} height={block.image.height || 360}
        />}
    </section>
}
