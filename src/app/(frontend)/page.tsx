import { getPayload } from 'payload'
import config from '@payload-config'
import { RenderBlocks } from '@/blocks'

export default async function Page() {
  const payload = await getPayload({ config })

  const postQuery = await payload.find({
    collection: 'posts',
    limit: 1,
    where: {
      slug: {
        equals: 'blog-1'
      }
    }
  })

  const post = postQuery.docs[0]

  return <RenderBlocks blocks={post.blockTest} />

}