import type { Image as ImageProps, Media } from '@/payload-types'
import Image from 'next/image'

export const Img = (props: ImageProps) => {
  const { image } = props
  const { filename, alt, width, height } = image as Media

  return <Image src={`${process.env.S3}/${filename}`} alt={alt} height={height || 360} width={width || 640}  />
}