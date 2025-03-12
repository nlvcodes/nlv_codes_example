import {Payload} from 'payload'
import Link from 'next/link'

export const PostsByStatus = async ({payload}: {payload: Payload}) => {
  const drafts = await payload.count({
    collection: 'posts',
    where: {
      _status: {
        equals: 'draft'
      }
    }
  }).then(res => res.totalDocs)

  const published = await payload.count({
    collection: 'posts',
    where: {
      _status: {
        equals: 'published'
      }
    }
  }).then(res => res.totalDocs)

  return <p>There {drafts !== 1 ? `are` : `is`} {drafts} post{drafts !== 1 ? `s` : ``} in <Link href={`/admin/collections/posts?limit=10&page=1&where%5Bor%5D%5B0%5D%5Band%5D%5B0%5D%5B_status%5D%5Bequals%5D=draft`}>draft</Link> and {published} post{published !== 1 ? `s` : ``} <Link href={`/admin/collections/posts?limit=10&page=1&where%5Bor%5D%5B0%5D%5Band%5D%5B0%5D%5B_status%5D%5Bequals%5D=published`}>published</Link>.</p>
}