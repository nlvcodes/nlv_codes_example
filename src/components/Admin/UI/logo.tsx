import type { Payload } from 'payload'
import Image from 'next/image'
import { Media } from '@/payload-types'

export const Logo = async ({payload}: {payload: Payload}) => {
  const logos = await payload.findGlobal({
    slug: 'logos'
  })

  const lightModeLogo = logos.lightModeLogo as Media
  const darkModeLogo = logos.darkModeLogo as Media

  return <>
    <Image
      src={`https://pub-bd030be048334ccb85b400876a5cab94.r2.dev/test-storage/${lightModeLogo.filename}`}
      alt={lightModeLogo.alt}
      width={lightModeLogo.width!}
      height={lightModeLogo.height!}
      className={'lightMode'}
    />
    <Image
      src={`https://pub-bd030be048334ccb85b400876a5cab94.r2.dev/test-storage/${darkModeLogo.filename}`}
      alt={darkModeLogo.alt}
      width={darkModeLogo.width!}
      height={darkModeLogo.height!}
      className={'darkMode'}
    />
  </>

}