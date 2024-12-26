import { CollectionConfig } from 'payload'
import { ContentWithMedia } from '@/blocks/ContentWithMedia'

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
    },
    {
      name: 'plaintext',
      type: 'textarea',
    },
    { name: 'number', type: 'number' },
    { name: 'users', type: 'relationship', relationTo: 'users' },
  ],
}