import type {CollectionAfterChangeHook, CollectionAfterDeleteHook} from 'payload'
import {revalidatePath} from 'next/cache'
import type {Page} from '@/payload-types'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({ doc, previousDoc, req: {payload} }) => {
  if (doc._status === 'published') {
    const path = doc.slug === 'home' ? '/' : `/${doc.slug}`
    payload.logger.info(`Revalidating page ${path}`)
    revalidatePath(path)
  }

  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`
    payload.logger.info(`Revalidating page ${oldPath}`)
    revalidatePath(oldPath)
  }

  return doc
}

export const revalidatePageOnDelete: CollectionAfterDeleteHook<Page> = ({ doc}) => {
  const path = doc.slug === 'home' ? '/' : `/${doc.slug}`
  revalidatePath(path)
  return doc
}