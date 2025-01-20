import { CollectionConfig } from 'payload'
import { ContentWithMedia } from '@/blocks/ContentWithMedia/config'
import { BlocksFeature, FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { TableOfContents } from '@/blocks/TableOfContents/config'
import {MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField} from '@payloadcms/plugin-seo/fields'

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
    slug: true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              type: 'blocks',
              admin: {
                initCollapsed: true,
                isSortable: false,
              },
              blocks: [
                ContentWithMedia, TableOfContents,
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
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  BlocksFeature({
                    blocks: [ContentWithMedia, TableOfContents],
                  }),
                  FixedToolbarFeature(),
                ],
              }),
            },
            {
              name: 'plaintext',
              type: 'textarea',
            },
            { name: 'number', type: 'number' },
            {
              name: 'usersArray',
              type: 'array',
              fields: [{ name: 'users', type: 'relationship', relationTo: 'users' }],
            },
          ],
        },
        {
          label: 'SEO',
          name: 'meta',
          fields: [
            MetaTitleField({
              hasGenerateFn: true,
              overrides: {
                label: 'Title'
              }
            }),
            MetaDescriptionField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media'
            }),
            {
              type: 'text',
              name: 'canonicalUrl',
              label: 'Canonical URL',
              hooks: {
                beforeChange: [
                  async ({data, value}) => !value ? `https://example.com/posts/${data?.slug}` : value
                ]
              }
            },
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            })
          ]
        },
      ],
    },
  ],
}