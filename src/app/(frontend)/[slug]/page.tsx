import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks'
import {notFound} from 'next/navigation'
import { draftMode, headers as getHeaders } from 'next/headers'
import { LivePreviewListener } from '@/components/LivePreviewListener'


type Args = {
  params: Promise<{ slug?: string; }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = 'home' } = await paramsPromise
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const {user} = await payload.auth({headers})

  const page = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    overrideAccess: Boolean(user),
    draft: Boolean(user),
  }).then(res => res.docs[0])

  if (!page) return notFound()



  return <>
    {user && <LivePreviewListener />}
    <h1>
      {page.title}
    </h1>
    <RenderBlocks blocks={page.blocks} />
  </>
}