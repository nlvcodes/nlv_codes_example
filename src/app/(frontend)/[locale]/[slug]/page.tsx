import {getPayload, TypedLocale} from 'payload'
import configPromise from '@payload-config'
import {RenderBlocks} from '@/blocks'
import {notFound} from 'next/navigation'
import {headers as getHeaders} from 'next/headers'
import {LivePreviewListener} from '@/components/LivePreviewListener'
import {draftMode} from 'next/headers'
import React, {cache} from 'react'
import type {Document} from '@/payload-types'
import { getPremiumImageURL, getPrivateImageURL, getTransformationUrl } from 'payload-storage-cloudinary'
import { ProtectedImage } from '@/components/Cloudinary/ProtectedImage'

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

  const page = await queryPageBySlug({slug, locale})
  const document = page.document as Document

  if (!page) return notFound()

  // const pixelated = getTransformationUrl({
  //   publicId: document.cloudinaryPublicId!,
  //   version: document.cloudinaryVersion!,
  //   presetName: 'pixelated',
  //   presets: [
  //     {
  //       name: 'pixelated',
  //       label: 'Pixelated',
  //       transformations: {
  //         effect: 'pixelate:3000',
  //       }
  //     }
  //   ]
  // })

  function getTransformedUrl(originalUrl: string, transformations: string) {
    const parts = originalUrl.split('/upload/')
    return `${parts[0]}/upload/${transformations}/${parts[1]}`
  }

  function ResponsiveImage({doc}: {doc: Document}) {
    const widths = [320, 640, 1024, 1920]
    const srcSet = widths.map(width => `${getTransformedUrl(doc.url!,`w_${width},q_auto,f_auto`)} ${width}w`).join(', ')

    return (
      <img
        src={getTransformedUrl(doc.url!, `w_1024,q_auto,f_auto`)}
        srcSet={srcSet}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        alt={doc.alt}
      />
    )

  }

  const { url } = await getPremiumImageURL(document, {
    payload,
    collection: 'documents',
    includeTransformations: true,
    isAuthenticated: !!user,
  })

  return <div>
    <h1>{page.title}</h1>

    {/* eslint-disable-next-line @next/next/no-img-element */}
    <ProtectedImage doc={document} collection={'documents'} />
    {/*<ResponsiveImage doc={document} />*/}
    <img
      src={url}
      alt={document.alt}
      height={document.height || 360}
      width={document.width || 640}
    />
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