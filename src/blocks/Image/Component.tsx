import type { Image as ImgProps, Media } from '@/payload-types'
// we'll import our type Image as ImgProps so we can name our exported constant Img
// we'll also need our Media type from '@/payload-types'
import Image from 'next/image'
// We'll import the Image component from 'next/image' so we can optimize our images

export const Img = (props: ImgProps) => {
  const { image } = props // all we need is the image constant from our props
  // but we need to cast the image const to Media and take the filename, alt, height, and width from it
  const { filename, alt, width, height } = image as Media

  return <Image // then we can return our Image component with our filename, alt, height, and width
    // filename will be added to the end of our S3 bucket URL which is stored in our .env file
    src={`${process.env.S3}/${filename}`}
    // then we can include our alt description
    alt={alt}
    // and our height and width with default values of 360 and 640, respectively
    height={height || 360}
    width={width || 640}
    // then we'll style the image to fit our aspect ratio of square, or a 1/1 aspect ratio.
    // we'll then add overflow hidden to prevent any content from overflowing the image container.
    // and finally we'll add object cover to make sure the image is cropped to fit the container.
    // and add a little margin to the top and bottom of the image.
    className={`aspect-square overflow-hidden object-cover my-2`}
  />
}