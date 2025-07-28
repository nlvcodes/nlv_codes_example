import { CollectionSlug, TaskHandlerArgs, TaskInput } from 'payload'

export const schedulePublish = {
  slug: 'schedulePublish',
  retries: 1,
  handler: async ({ job, req }: TaskHandlerArgs<'schedulePublish'>) => {

    const { type, doc } = job.input as TaskInput<'schedulePublish'>

    if (!doc || doc.relationTo !== 'posts') {
      req.payload.logger.warn('schedulePublish job called for non-post document. Skipping')
      return { output: { success: true, skipped: true } }
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
            html: `<h2>Scheduled Publishing Failed</h2><p>Error: ${doc.relationTo} with ID ${doc.value} not found</p><p>Time: ${new Date()}</p>`,
          })
          return { output: { success: false, error: `${doc.relationTo} not found` } }
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
          html: `<h2>Scheduled Publishing Succeeded</h2><p> ${doc.relationTo} with ID ${doc.value} was published successfully</p><p>Time: ${new Date()}</p>`,
        })

        req.payload.logger.info({ msg: `Published scheduled ${doc.relationTo}: ${publishPost.id} at ${new Date()}` })
        return { output: { success: true, publishedAt: new Date().toISOString(), id: publishPost.id } }
      }

    } catch (e) {
      req.payload.logger.error({ msg: `Error in schedulePublish for ${doc.relationTo} ${doc.value}:`, e })
      await req.payload.sendEmail({
        to: 'nick@midlowebdesign.com',
        html: `<h2>Scheduled Publishing Failed</h2><p>Error for ${doc.relationTo} ${doc.value}: ${e instanceof Error ? e.message : 'Unknown error'}</p><p>Time: ${new Date()}</p><pre>${JSON.stringify(e, null, 2)}</pre>`,
      })
      req.payload.logger.error('Full error details:', JSON.stringify(e, null, 2))
      throw e
    }
  },
}