'use client'
import Image from 'next/image'

export default function Page() {

  const imageLoader = ({ src, width, quality }: { src?: string, width?: number, quality?: number }) => {
    return `https://images.nlvcodes.com/${src}?w=${width}&q=${quality}`
  }

  return (
    <>
      <Image
        src="/024-dYtWD1AVaaE.JPEG"
        alt="NLV Codes"
        width={640}
        height={360}
      />
      <Image
        priority
        style={{ objectFit: 'contain' }}
        overrideSrc={'/024-dYtWD1AVaaE.JPEG'}
        loader={imageLoader}
        loading={'lazy'}
        blurDataURL={'data:image/png...'}
        onLoad={(e) => console.log(e.target)}
        onError={(e) => console.error(e.target)}
        src="https://images.nlvcodes.com/024-dYtWD1AVaaE-1-768x576.webp"
        alt="NLV Codes"
        width={640}
        height={360}
        // fill
        sizes="(max-width: 768px) 100vw, 33vw"
        quality={80}
      />
    </>
  )
}

