import { ContentWithMedia } from '@/payload-types'
import Image from 'next/image'
import RichText from '@/components/RichText'


export function ContentWithMediaBlock({content, image, textPosition}: ContentWithMedia) {

  if (textPosition === 'Left') {
    return <section>
      {content && <RichText data={content}/>}
      {image && typeof image !== 'string' &&
        <Image
          src={image.thumbnailURL || ``}
          alt={image.alt || ``}
          width={image.width || 640}
          height={image.height || 360}
      />}
    </section>
  } else {
    return <section>
      {image && typeof image !== 'string' &&
        <Image
          src={image.thumbnailURL || ``}
          alt={image.alt || ``}
          width={image.width || 640}
          height={image.height || 360}
      />}
      {content && <RichText data={content}/>}
    </section>
  }
}