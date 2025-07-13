import { CollectionConfig, CollectionSlug, GeneratePreviewURL, TypedLocale } from 'payload'
import { ContentWithMedia } from '@/blocks/ContentWithMedia/config'
import { TableOfContents } from '@/blocks/TableOfContents/config'
import editor from '@/collections/Users/access/editor'
import admin from '@/collections/Users/access/admin'
import { FormBlock } from '@/blocks/Form/config'
import { Section } from '@/blocks/Section/config'
import { Code } from '@/blocks/Code/config'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    preview: (doc, options) => {
      const encodedParams = new URLSearchParams({
        slug: doc?.slug as string,
        path: doc?.slug === 'home' ? '/' : `/${doc.slug}`,
        collection: 'pages',
        previewSecret: process.env.PREVIEW_SECRET || '',
        locale: options.locale,
      })

      return `${process.env.NEXT_PUBLIC_SERVER_URL}/draft/preview?${encodedParams.toString()}`
    },
  },
  labels: {singular: 'Page', plural: 'Pages'},
  hooks: {
    afterChange: [revalidatePage],
    afterDelete: [revalidateDelete]
  },
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
    { name: 'slug', type: 'text', localized: true },
    { name: 'title', type: 'text', localized: true },
    { name: 'content', type: 'blocks', blocks: [ContentWithMedia, TableOfContents, FormBlock, Section, Code] },
    {
      name: 'tailwindExample', type: 'group',
      fields: [
        { name: 'buttonColor', type: 'select', options: [
          'white', 'red', 'black', 'blue'
          ] },
        { name: 'textColor', type: 'select', options: [
          'white', 'red', 'black', 'blue'
          ] },
        { name: 'backgroundColor', type: 'select', options: [
          'white', 'red', 'black', 'blue'
          ] },
      ],
    },
  ],
}