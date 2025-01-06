import { CollectionConfig } from 'payload'
import { ContentWithMedia } from '@/blocks/ContentWithMedia'
import { BlocksFeature, FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { TableOfContents } from '@/blocks/TableOfContents/config'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    group: 'Posts',
    useAsTitle: 'title',
    description: 'This is a blog collection.',
  },
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
  },
  defaultSort: ['-number', '-title'],
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Posts',
  },
  defaultPopulate: {
    slug: true
  },
  fields: [
    {
      type: 'blocks',
      admin: {
        initCollapsed: true,
        isSortable: false,
      },
      blocks: [
        ContentWithMedia
      ],
      name: 'blockTest',
      label: false,
      minRows: 1,
      maxRows: 20,
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'slug',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({defaultFeatures}) => [
          ...defaultFeatures,
          BlocksFeature({
            blocks: [ContentWithMedia, TableOfContents],
          }),
          FixedToolbarFeature()
        ]
      })
    },
    {
      name: 'plaintext',
      type: 'textarea',
    },
    { name: 'number', type: 'number' },
    {
      name: 'usersArray',
      type: 'array',
      fields: [{name: 'users', type: 'relationship', relationTo: 'users'}]
    },
  ],
  // hooks: {
  //   afterChange: [
  //     async ({req: {payload}, collection, doc}) => {
  //     const sendEmail = await payload.sendEmail({
  //       to: 'nick@midlowebdesign.com',
  //       subject: `Change made in ${collection.slug}`,
  //       html: `<div><h2>Changes made:</h2> <p>change made to <em>${doc.title}</em> in ${collection.slug}</p></div>`
  //     })
  //     }
  //   ]
  // }
}