import {CollectionConfig} from 'payload'
import { ContentWithMedia } from '@/blocks/ContentWithMedia/config'
import { TableOfContents } from '@/blocks/TableOfContents/config'
import editor from '@/collections/Users/access/editor'

export const Pages: CollectionConfig = {
  slug: 'pages',
  versions: {
    maxPerDoc: 100,
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: false,
      validate: false
    },
  },
  access: {
    read: ({req}) => {

      if (req.user && req.user.collection === 'users') {
        return true
      }

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
    readVersions: editor
  },
  fields: [
    { name: 'slug', type: 'text' },
    { name: 'title', type: 'text', },
    { name: 'blocks', type: 'blocks', blocks: [ContentWithMedia, TableOfContents] }
  ]
}