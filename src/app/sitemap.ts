import type {MetadataRoute} from 'next'
import {getPayload} from 'payload'
import config from '@payload-config'
import { getServerSideURL } from '@/utilities/getURL'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const payload = await getPayload({config})
    const posts = await payload.find({
      collection: 'posts',
      limit: 0,
      where: {}
    })
    const url = getServerSideURL()

    return [
      ...posts.docs.map(({slug, updatedAt}) => ({
        url: `${url}/en/${slug}`,
        lastModified: new Date(updatedAt),
        alternates: {
          languages: {
            es: `${url}/es/${slug}`
          }
        }
      })),
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return empty sitemap if database connection fails during build
    return []
  }
}