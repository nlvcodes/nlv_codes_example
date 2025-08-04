import type { Payload } from 'payload'
import { Media } from '@/payload-types'
import Image from 'next/image'

export const Icon = async ({ payload }: { payload: Payload }) => {
  const logos = await payload.findGlobal({ slug: 'logos' })
  const lightModeIcon = logos.lightModeIcon as Media
  const darkModeIcon = logos.darkModeIcon as Media

  return <>
    <Image className='lightMode' src={`https://pub-bd030be048334ccb85b400876a5cab94.r2.dev/test-storage/${lightModeIcon.filename}`} alt={lightModeIcon.alt} width={lightModeIcon.width!} height={lightModeIcon.height!}></Image>
    <Image className='darkMode' src={`https://pub-bd030be048334ccb85b400876a5cab94.r2.dev/test-storage/${darkModeIcon.filename}`} alt={darkModeIcon.alt} width={darkModeIcon.width!} height={darkModeIcon.height!}></Image>
  </>
}