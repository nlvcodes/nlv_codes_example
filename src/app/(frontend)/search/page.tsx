import configPromise from '@payload-config'
import {getPayload} from 'payload'
import React from 'react'
import {Search} from '@/components/Search/Component'
import Link from 'next/link'

import type {Metadata} from 'next'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}

export default async function Page({searchParams: searchParamsPromise}: Args) {
  const {q : query} = await searchParamsPromise
  const payload = await getPayload({config: configPromise})
  const post = await payload.find({
    collection: 'search-results',
    depth: 1,
    limit: 6,
    select: {
      title: true,
      excerpt: true,
      slug: true,
      doc: true,
    },
    pagination: false,
    ...(query ? {
      where: {
        or: [
          {title: {like: query}},
          {excerpt: {like: query}},
          {slug: {like: query}},
        ]
      }
    } : {})
  })

  return (
    <div className={`py-24`}>
      <div className={"mb-16"}>
        <div className={'text-center'}>
          <h1 className={`mb-8 lg:mb-16 text-emerald-950`}>Search</h1>
          <div className={'mx-auto'}>
            <Search />
          </div>
        </div>
      </div>
      <div className={`flex gap-4 justify-center`}>
        {post.totalDocs > 0 ? (
          post.docs.map((doc) => {
            const relationTo = doc.doc.relationTo
            const slug = doc.slug === 'home' ? '/' : relationTo === 'posts' ? `/posts/${doc.slug}` : `/${doc.slug}`
            return <Link key={doc.id} href={slug!} className={`py-2 px-4 text-emerald-950 border border-emerald-950 rounded-md hover:text-emerald-50 hover:bg-emerald-950`}>{doc.title}</Link>
          })
        ) : <div>No results found.</div>}
      </div>
    </div>
  )

}

export function generateMetadata(): Metadata {
  return {
    title: 'NLV Codes Example Search'
  }
}