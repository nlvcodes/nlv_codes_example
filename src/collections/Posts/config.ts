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
  versions: {
    drafts: {
      schedulePublish: true,
    },
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
      name: 'authors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: {
        position: 'sidebar'
      }
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {type: 'upload', name: 'image', relationTo: 'media'},
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
                admin: {
                  hideInsertParagraphAtEnd: true,
                },
              }),
            },
            {
              name: 'plaintext',
              type: 'textarea',
            },
            { name: 'number', type: 'number' },
          ],
        },
        {
          label: 'SEO',
          name: 'meta',
          fields: [
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaDescriptionField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
              hasGenerateFn: true,
            }),
            {
              name: 'canonicalUrl',
              label: 'Canonical URL',
              type: 'text',
              hooks: {
                beforeChange: [
                  async ({data, value}) => value ? value : `https://example.com/posts/${data?.slug}`
                ]
              }
            },
            PreviewField({
              hasGenerateFn: true,
            }),
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            })
          ]
        }
      ],
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