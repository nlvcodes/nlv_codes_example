import { getPayload } from 'payload'
import config from '@payload-config'
import { RenderBlocks } from '@/blocks'
import { RichText } from '@/components/RichText'
import type {Metadata} from 'next'
import {generateMeta} from '@/utilities/generateMeta'
import { articleSchema, imageSchema } from '@/components/Schema'
import { Media } from '@/payload-types'
import Script from 'next/script'
import {Redirects} from '@/components/Redirects'

type Args = {
  params: Promise<{slug?: string}>
}

export default async function Post({params: paramsPromise}: Args) {
  const {slug} = await paramsPromise
  const url = '/posts/' + slug
  const payload = await getPayload({ config })

  const postQuery = await payload.find({
    collection: 'posts',
    limit: 1,
    where: {
      slug: {
        equals: slug
      },
      _status: {
        equals: 'published'
      }
    }
  })

  const post = postQuery.docs[0]

  if (!post) { return <Redirects url={url} />}

  const schema = [
    imageSchema(post.meta?.image as Media),
    articleSchema(post)
  ]

  return <>
    <Redirects url={url} disableNotFound />
    <Script type={'application/ld+json'} strategy={'lazyOnload'}>
      {JSON.stringify(schema)}
    </Script>
    <RenderBlocks blocks={post.blockTest} />
    {post.content && <RichText data={post.content} />}
    {post.plaintext}
  </>

}

export async function generateMetadata({params: paramsPromise}: Args): Promise<Metadata> {
  const {slug} = await paramsPromise
  const payload = await getPayload({ config })
  const post = await payload.find({
    collection: 'posts',
    limit: 1,
    where: {
      slug: {
        equals: slug
      },
      _status: {
        equals: 'published'
      }
    },
    pagination: false
  }).then(res => res.docs?.[0])

  return generateMeta({doc: post})

}