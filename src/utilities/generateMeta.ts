import type {Metadata} from 'next'
import type {Post, Config, Media} from '@/payload-types'
import {mergeOpenGraph} from './mergeOpenGraph'
import {getServerSideURL} from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  let serverUrl = getServerSideURL()

  let url = serverUrl + '/2025 01 21 Relationship C.webp'

  if (image && typeof image === 'object' && url in image) {
    const ogUrl = image.sizes?.small?.url
    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url

}

export const generateMeta = async (args: {doc: Partial<Post>}): Promise<Metadata> => {
  const { doc } = args || {}
  const ogImage = getImageURL(doc?.meta?.image)
  const title = doc?.meta?.title ? doc.meta.title + ' Blank Payload' : 'Blank Payload'
  const description = doc?.meta?.description ? doc.meta.description : ''
  const url = doc?.meta?.canonicalUrl
    ? doc?.meta?.canonicalUrl
    : Array.isArray(doc?.slug)
      ? doc.slug.join('/') : '/'

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: mergeOpenGraph({
      title,
      description,
      images: ogImage ? [{url: ogImage}] : undefined,
      url
    }),
  }

}