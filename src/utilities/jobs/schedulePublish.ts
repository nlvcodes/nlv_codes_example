import {CollectionSlug, TaskHandlerArgs, TaskInput} from 'payload'

export const schedulePublish = {
  slug: 'schedulePublish',
  retries: 1,
  handler: async ({job, req}: TaskHandlerArgs<'schedulePublish'>) => {
    const {type, doc} = job.input as TaskInput<'schedulePublish'>
    if (!doc || doc.relationTo !== 'posts') {
      req.payload.logger.warn('schedulePublish job called for non-post document. Skipping.')
      return {output: { success: true, skipped: true}}
    }
    try {
      if (type === 'publish') {
        const post = await req.payload.findByID({
          collection: doc.relationTo as CollectionSlug,
          id: doc.value as string,
          draft: true,
        })

        if (!post) {
          await req.payload.sendEmail({
            to: 'nick@nlvogel.com',
            html: `<h2>Scheduled Publishing Failed</h2>`
          })

          return {output: { success: false, error: `${doc.relationTo} not found`}}
        }
      }

      const publishPost = await req.payload.update({
        collection: doc.relationTo as CollectionSlug,
        id: doc.value as string,
        data: {
          _status: 'published',
        },
        draft: false,
      })

      await req.payload.sendEmail({
        to: 'nick@nlvogel.com',
        html: `<h2>Scheduled Publishing Success</h2>`
      })
      return {output: { success: true, publishedAt: new Date().toISOString(), id: publishPost.id}}
    } catch (e) {
      req.payload.logger.error('Error in schedulePublish job: ', e)
      await req.payload.sendEmail({
        to: 'nick@nlvogel.com',
        html: `<h2>Scheduled Publishing Failed</h2>`
      })
      throw e
    }
  }
}