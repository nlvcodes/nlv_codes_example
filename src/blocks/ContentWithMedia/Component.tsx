import type { ContentWithMedia as ContentWithMediaProps } from '@/payload-types'
import Image from 'next/image'
import { RichText } from '@/components/RichText'
import {LoaderCircle} from 'lucide-react'

type Props = {
  className?: string
} & ContentWithMediaProps

export const ContentWithMedia: React.FC<Props> = (block) => {

  const firstLetter = `first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900`

  return <div className={`print:hidden`}>
    <div className={`w-75 mx-auto my-2`}>
      <details className="p-4 border border-transparent rounded-2xl open:border-emerald-950/10 open:bg-emerald-100" open>
        <summary className="text-sm font-semibold text-emerald-900 select-none">This is a summary box
        </summary>
        <div className="mt-3 text-sm text-emerald-600">
          <p>It can open and close and change styles accordingly</p>
        </div>
      </details>
    <input
      inert
      className={`mx-auto border border-emerald-950 placeholder:text-emerald-950 rounded-lg p-2 
       inert:bg-emerald-200/30 inert:placeholder:text-emerald-950/30`
      } placeholder={`email`} type={'email'} />
    </div>
    <div data-list-items={2} data-ui={'dark-mode'} className={`data-dark-mode:bg-purple-400 flex justify-center p-4`}>
      <ul role="list" dir={'rtl'}
          className={`rtl:text-white sm:grid sm:grid-cols-2 md:grid-cols-3 md:gap-4 list-disc marker:text-emerald-400 hover:marker:text-emerald-950`}>
        <li>Get groceries</li>
        <li>Make dinner</li>
        <li>Stream live coding session</li>
      </ul>
    </div>
    <LoaderCircle className={'animate-spin motion-reduce:hidden'} />
    <section
      className={'grid grid-cols-12 gap-4 m-4 p-4 bg-[#afa] rounded-2xl dark:bg-emerald-600 dark:text-emerald-50 group'}>
      {block.content
        && <RichText data={block.content}
                     className={`first-line:font-serif ${firstLetter} col-span-12 order-last md:col-span-3 sm:selection:bg-white sm:selection:text-black group-hover:text-black ${block.textPosition === 'Right'
                       ? `md:order-last`
                       : `md:order-first`}
        `}
        />
      }
      {/*<div className='**:bg-sky-400'>*/}
      {/*  <p className=''>Paragraph text</p>*/}
      {/*  <div className='p-2'>*/}
      {/*    <p className='bg-amber-700'>This is span 1</p>*/}
      {/*    <p className='bg-amber-700'>This is span 2</p>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {block.image
        && typeof block.image !== 'string'
        && <Image
          id={'test'}
          src={block.image.thumbnailURL || ``} alt={block.image.alt || ``}
          className={'col-span-12 md:col-span-9 landscape:grayscale'}
          width={block.image.width || 640}
          height={block.image.height || 360}
        />
      }
    </section>
  </div>

}
