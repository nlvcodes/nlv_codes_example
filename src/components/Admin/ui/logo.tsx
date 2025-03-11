import type { Payload } from 'payload'
import { Media } from '@/payload-types'
import Image from 'next/image'

export const Logo = async ({ payload }: { payload: Payload }) => {
  const logos = await payload.findGlobal({ slug: 'logos' })
  const lightModeLogo = logos.lightModeLogo as Media
  const darkModeLogo = logos.darkModeLogo as Media

  return <>
    <Image className='lightMode' src={`https://pub-bd030be048334ccb85b400876a5cab94.r2.dev/test-storage/${lightModeLogo.filename}`} alt={lightModeLogo.alt} width={lightModeLogo.width!} height={lightModeLogo.height!}></Image>
    <Image className='darkMode' src={`https://pub-bd030be048334ccb85b400876a5cab94.r2.dev/test-storage/${darkModeLogo.filename}`} alt={darkModeLogo.alt} width={darkModeLogo.width!} height={darkModeLogo.height!}></Image>
  </>
}