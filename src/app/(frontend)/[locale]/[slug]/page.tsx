import {getPayload, TypedLocale} from 'payload'
import configPromise from '@payload-config'
import {RenderBlocks} from '@/blocks'
import { notFound } from 'next/navigation'
import {headers as getHeaders} from 'next/headers'
import {LivePreviewListener} from '@/components/LivePreviewListener'
import {draftMode} from 'next/headers'
import React, {cache} from 'react'

type Args = {
  params: Promise<{
    slug?: string
    locale?: TypedLocale
  }>
}

export default async function Page({params: paramsPromise}: Args) {
  const headers = await getHeaders()
  const localeSlugs = {
    en: 'home',
    es: 'inicio',
  }

  const {locale = 'en', slug = localeSlugs[locale]} = await paramsPromise

  const payload = await getPayload({config: configPromise})
  const {user} = await payload.auth({headers})

  const page = await queryPageBySlug({ slug, locale })

  if (!page) return notFound()

  return <div>
    {user && <LivePreviewListener />}
    <h1>{page.title}</h1>
    <div>button</div>
    <RenderBlocks blocks={page.content} />
  </div>

}

const queryPageBySlug = cache(async ({ slug, locale }: { slug: string, locale: TypedLocale }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const page = await payload.find({
  collection: 'pages',
  locale,
  where: {slug: {equals: decodeURIComponent(slug)}},
  overrideAccess: draft,
  draft
})
  return page.docs?.[0] || null
})