import type {Post, Media, User} from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

export const articleSchema = (props: Post) => {
  const image = props.meta?.image as Media
  const authors = props.authors as User[]
  const url = getServerSideURL()

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: props.title,
    datePublished: new Date(props.createdAt),
    dateModified: new Date(props.updatedAt),
    image: [`${process.env.S3_ENDPOINT}/${image.filename}`],
    author: authors.map(author => ({
      type: 'Person',
      name: author.name,
      sameAs: ['https://www.youtube.com/@nlv_codes']
    }))
  }
}

export const imageSchema = (props: Media) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: `${process.env.S3_ENDPOINT}/${props.filename}`,
    creditText: props.creditText
  }
}