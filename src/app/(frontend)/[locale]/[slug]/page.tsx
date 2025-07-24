import { getPayload, PaginatedDocs, TypedLocale } from 'payload'
import configPromise from '@payload-config'
import {RenderBlocks} from '@/blocks'
import {notFound} from 'next/navigation'
import {headers as getHeaders} from 'next/headers'
import {LivePreviewListener} from '@/components/LivePreviewListener'
import {draftMode} from 'next/headers'
import React, { cache, Suspense } from 'react'
import Pages from '@/components/Pages'
import type {Page} from '@/payload-types'

type Args = {
  params: Promise<{
    slug?: string
    locale?: TypedLocale
  }>
}

export default async function Page({params: paramsPromise}: Args) {
  const headers = await getHeaders()

  const data = fetch('http://localhost:3000/api/pages', {cache: 'no-store'}).then(res => res.json().then(res => res.docs))
  // const pages = data.json()
  // console.log(pages)

  // const dbPage = await payload.db.find({ collection: 'pages' } )
  // console.log(dbPage)

  const localeSlugs = {
    en: 'home',
    es: 'inicio',
  }

  const {locale = 'en', slug = localeSlugs[locale]} = await paramsPromise

  const payload = await getPayload({config: configPromise})

  const getCachedPages = cache(async () => {
	  const dbPage = await payload.db.find({ collection: 'pages' } )
    return dbPage.docs
  })

  // console.log(await getCachedPages())

  const {user} = await payload.auth({headers})

  const page = await queryPageBySlug({slug, locale})

  if (!page) return notFound()

  return <div>
    <h1>{page.title}</h1>
    <Suspense fallback={<div>Page loading...</div>}>
      <Pages pages={data} />
    </Suspense>
    {/*{user && <LivePreviewListener />}*/}
    {/*<div>button</div>*/}
    {/*<RenderBlocks blocks={page.content} />*/}
  </div>

}

const queryPageBySlug = cache(async ({slug, locale}: {slug: string, locale: TypedLocale}) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({config: configPromise})

  const page = await payload.find({
    collection: 'pages',
    locale,
    where: {slug: {equals: decodeURIComponent(slug)}},
    overrideAccess: draft,
    draft
  })

  return page.docs?.[0] || null

})