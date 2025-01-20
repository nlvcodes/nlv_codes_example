import { getPayload } from 'payload'
import config from '@payload-config'
import { RenderBlocks } from '@/blocks'
import { RichText } from '@/components/RichText'
import {generateMeta} from '@/utilities/generateMeta'
import { Metadata } from 'next'

type Args = { params: Promise<{slug?: string}>}

export default async function Post({params: paramsPromise}: Args) {
  const { slug } = await paramsPromise
  const payload = await getPayload({ config })

  const postQuery = await payload.find({
    collection: 'posts',
    limit: 1,
    where: {
      slug: {
        equals: slug
      }
    }
  })

  const post = postQuery.docs[0]

  return <>
    <RenderBlocks blocks={post.blockTest} />
    {post.content && <RichText data={post.content} />}
  </>

}

export async function generateMetadata({params: paramsPromise}: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const payload = await getPayload({ config })
  const post = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    pagination: false
  }).then(res => res.docs?.[0])

  return generateMeta({doc: post})

}