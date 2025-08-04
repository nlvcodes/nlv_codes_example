import type {MetadataRoute} from 'next'
import { getServerSideURL } from '@/utilities/getURL'

export default function robots(): MetadataRoute.Robots {
   const url = getServerSideURL()

  return {
     rules: [{
       userAgent: 'Googlebot',
       allow: '/',
       disallow: '/admin'
     },
       {
         userAgent: ['BingBot', 'SemrushBot'],
         disallow: '/'
       }
     ],
    sitemap: `${url}/sitemap.xml`,
  }
}