import {TableOfContents as ToCProps} from '@/payload-types'
import Link from 'next/link'


export function TableOfContents(block: ToCProps) {
  return <section>
    <div>
      {block.contents?.map(content => (
        <Link href={`/${content.link}`} key={content.id}>{content.header}</Link>
      ))}
    </div>
  </section>
}