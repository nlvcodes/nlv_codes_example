import type { Payload } from 'payload'
import Image from 'next/image'
import { Media } from '@/payload-types'

export const Icon = async ({payload}: {payload: Payload}) => {
  const icons = await payload.findGlobal({
    slug: 'logos'
  })

  const lightModeIcon = icons.lightModeIcon as Media
  const darkModeIcon = icons.darkModeIcon as Media

  return <>
    <Image
      src={`https://pub-bd030be048334ccb85b400876a5cab94.r2.dev/test-storage/${lightModeIcon.filename}`}
      alt={lightModeIcon.alt}
      width={lightModeIcon.width!}
      height={lightModeIcon.height!}
      className={'lightMode'}
    />
    <Image
      src={`https://pub-bd030be048334ccb85b400876a5cab94.r2.dev/test-storage/${darkModeIcon.filename}`}
      alt={darkModeIcon.alt}
      width={darkModeIcon.width!}
      height={darkModeIcon.height!}
      className={'darkMode'}
    />
  </>

}