import { CollectionConfig } from 'payload'
import { ContentWithMedia } from '@/blocks/ContentWithMedia/config'
import { TableOfContents } from '@/blocks/TableOfContents/config'
import editor from '@/collections/Users/access/editor'
import admin from '@/collections/Users/access/admin'
import { FormBlock } from '@/blocks/Form/config'
import { Section } from '@/blocks/Section/config'
import { Code } from '@/blocks/Code/config'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {singular: 'Page', plural: 'Pages'},
  access: {
    readVersions: editor,
    read: ({ req }) => {
      if (req.user && req.user?.collection === 'users') return true

      return {
        or: [
          {
            _status: {
              equals: 'published',
            },
          },
          {
            _status: {
              exists: false,
            },
          },
        ],
      }
    },
  },
  versions: {
    maxPerDoc: 100,
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: false,
      validate: false,
    },
  },
  fields: [
    { name: 'slug', type: 'text', localized: true, },
    { name: 'title', type: 'text', localized: true, },
    { name: 'content', type: 'blocks', blocks: [ContentWithMedia, TableOfContents, FormBlock, Section, Code] },
  ],
}