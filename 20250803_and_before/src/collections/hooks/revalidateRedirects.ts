import type {CollectionAfterChangeHook} from 'payload'
import {revalidateTag} from 'next/cache'

export const revalidateRedirects: CollectionAfterChangeHook = async ({doc, req: {payload}}) => {
  payload.logger.info('Revalidating redirects')
  revalidateTag('redirects')

  return doc
}