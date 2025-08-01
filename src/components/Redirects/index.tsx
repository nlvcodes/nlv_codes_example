import type React from 'react'
import type {Post} from '@/payload-types'
import {getCachedDocument} from '@/utilities/getDocument'
import {getCachedRedirects} from '@/utilities/getRedirects'
import {notFound, redirect} from 'next/navigation'

interface Props {
  disableNotFound?: boolean,
  url: string,
}

export const Redirects: React.FC<Props> = async ({disableNotFound, url}) => {
  const redirects = await getCachedRedirects()()

  const redirectItem = redirects.find((redirect) => redirect.from === url)

  if (redirectItem) {
    if (redirectItem.to?.url) {
     redirect(redirectItem.to.url)
    }

    let redirectUrl: string

    if (typeof redirectItem.to?.reference?.value === 'string') {
      const collection = redirectItem.to?.reference?.relationTo
      const id = redirectItem.to?.reference?.value

      const document = (await getCachedDocument(collection, id)()) as Post

      redirectUrl = `${redirectItem.to?.reference?.relationTo === 'posts' ? `/${redirectItem.to?.reference?.relationTo}` 
        : `${document?.slug}`}`
    } else {
      redirectUrl = `${
        redirectItem.to?.reference?.relationTo === 'posts' 
          ? `/${redirectItem.to?.reference?.relationTo}` 
          : '' 
      }/${
        typeof redirectItem.to?.reference?.value === 'object' 
          ? redirectItem.to?.reference?.value?.slug : ''
      }`
    }
    if (redirectUrl) redirect(redirectUrl)
  }
  if (disableNotFound) return null
  return notFound()
}