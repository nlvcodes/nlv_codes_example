import { ContentWithMedia } from '@/payload-types'
import Image from 'next/image'

export function ContentWithMediaBlock(block: ContentWithMedia) {
  if (block.textPosition === 'Left') {
    return <section>
      {block.content_html && <div dangerouslySetInnerHTML={{ __html: block.content_html }} />}
      {block.image && typeof block.image !== 'string' &&
        <Image src={block.image.thumbnailURL || ``} alt={block.image.alt || ``}
        width={block.image.width || 640} height={block.image.height || 360}
        />}
    </section>
  } else if (block.textPosition === 'Right') {
    return <section>
      {block.image && typeof block.image !== 'string' &&
        <Image src={block.image.thumbnailURL || ``} alt={block.image.alt || ``}
        width={block.image.width || 640} height={block.image.height || 360}
        />}
      {block.content_html && <div dangerouslySetInnerHTML={{ __html: block.content_html }} />}
    </section>
  }
}