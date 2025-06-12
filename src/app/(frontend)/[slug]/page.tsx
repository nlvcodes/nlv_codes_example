import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks'
import { notFound } from 'next/navigation'
import { headers as getHeaders } from 'next/headers'
import { LivePreviewListener } from '@/components/LivePreviewListener'

type Args = {
  params: Promise<{ slug?: string }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const headers = await getHeaders()

  const { slug = 'home' } = await paramsPromise

  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })
  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    overrideAccess: Boolean(user),
    draft: Boolean(user),
  }).then(res => res.docs[0])

  if (!page) return notFound()

  const { tailwindExample } = page
  const { backgroundColor, textColor, buttonColor } = tailwindExample || {}
  // const backgroundStyles = {
  //   white: 'bg-white',
  //   black: 'bg-black',
  //   red: 'bg-red-500',
  // }

  const backgroundStyles = {
    [backgroundColor as string]: !['black', 'white'].includes(backgroundColor!) ? `bg-${backgroundColor}-500` : `bg-${backgroundColor}`,
  }

  // const textStyles = {
  //   white: 'text-white',
  //   black: 'text-black',
  //   red: 'text-red-500',
  // }

    const textStyles = {
    [textColor as string]: !['black', 'white'].includes(textColor!) ? `text-${textColor}-500` : `text-${textColor}`,
  }

  // const buttonStyles = {
  //   white: 'bg-white',
  //   black: 'bg-black',
  //   red: 'bg-red-500',
  // }

    const buttonStyles = {
    [buttonColor as string]: !['black', 'white'].includes(buttonColor!) ? `bg-${buttonColor}-500` : `bg-${buttonColor}`,
  }

  // return <div style={{ backgroundColor: backgroundColor || '' }}>
  //   {user && <LivePreviewListener />}
  //   <h1 style={{color: textColor || ''}}>{page.title}</h1>
  //   <div style={{backgroundColor: buttonColor || ''}}>Button</div>
  //   {/*<RenderBlocks blocks={page.content} />*/}
  // </div>

  // return <div
  //   style={{
  //     // @ts-ignore
  //     '--bg-color': backgroundColor,
  //     '--text-color': textColor,
  //     '--button-color': buttonColor,
  //   }}
  //   className={`bg-(--bg-color) py-[13rem] hover:text-(--button-color) hover:[clip-path:circle(55%)]`}
  // >
  //   {user && <LivePreviewListener />}
  //   <h1 className={'text-(--text-color)'}>{page.title}</h1>
  //   <div className={'bg-(--button-color)'}>Button</div>
  // </div>

  return <div className={backgroundStyles[backgroundColor || 'white']}>
    {user && <LivePreviewListener />}
    <h1 className={textStyles[textColor || 'white']}>{page.title}</h1>
    <div className={buttonStyles[buttonColor || 'white']}>Button</div>
  </div>

}