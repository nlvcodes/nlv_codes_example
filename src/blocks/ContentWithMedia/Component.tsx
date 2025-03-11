import type { ContentWithMedia as ContentWithMediaProps } from '@/payload-types'
import Image from 'next/image'
import { RichText } from '@/components/RichText'

type Props = {
  className?: string
} & ContentWithMediaProps

export const ContentWithMedia: React.FC<Props> = (block) => {
  return <section className={'grid grid-cols-12 gap-4 m-4 p-4 bg-[#afa] rounded-2xl dark:bg-emerald-600 dark:text-emerald-50 group hover:not-dark:bg-black'}>
    {block.content
      && <RichText data={block.content} className={`col-span-12 order-last md:col-span-3 group-hover:text-black ${block.textPosition === 'Right' 
        ? `md:order-last` 
        : `md:order-first`}
        `}
      />
    }
    <div className='**:bg-sky-400'>
      <p className=''>Paragraph text</p>
      <div className='p-2'>
        <p className='bg-amber-700'>This is span 1</p>
        <p className='bg-amber-700'>This is span 2</p>
      </div>
    </div>
    {block.image
      && typeof block.image !== 'string'
      && <Image
        id={'test'}
        src={block.image.thumbnailURL || ``} alt={block.image.alt || ``}
        className={'col-span-12 md:col-span-9 group-hover:grayscale'}
        width={block.image.width || 640}
        height={block.image.height || 360}
      />
    }
  </section>

}
