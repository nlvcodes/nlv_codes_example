import type {Metadata} from 'next'
import {getServerSideURL} from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  title: 'Blank Payload',
  siteName: 'Blank Payload',
  description: 'This is an extension of the PayloadCMS blank template.',
  images: [
    {
      url: `${getServerSideURL()}/2025 01 21 Relationship C.webp`
    },
  ]
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}