import { CollectionConfig } from 'payload'
import { ContentWithMedia } from '@/blocks/ContentWithMedia/config'
import { BlocksFeature, FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { TableOfContents } from '@/blocks/TableOfContents/config'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { anyone } from '@/collections/Users/access/anyone'
import editor from '@/collections/Users/access/editor'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    meta: {
      titleSuffix: '- titleSuffix',
    },
    listSearchableFields: ['slug', 'title', 'authors'],
    pagination: {
      limits: [0, 10, 20, 50],
      defaultLimit: 0,
    },
    defaultColumns: ['title', 'slug', 'date', 'authors', 'id'],
    hideAPIURL: process.env.NEXT_PUBLIC_ENABLE_AUTOLOGIN !== 'true',
    group: 'Posts',
    useAsTitle: 'title',
    description: 'This is a blog collection.',
    components: {
      beforeList: [
        {
          path: 'src/collections/Posts/components/beforeList.tsx#BeforeListContent',
        },
      ],
      afterList: [
        {
          path: 'src/collections/Posts/components/afterList.tsx#AfterListContent',
        },
      ],
      beforeListTable: [
        {
          path: 'src/collections/Posts/components/PostsByStatus.tsx#PostsByStatus',
        },
      ],
      Description: {
        path: 'src/collections/Posts/components/description.tsx#Description',
      },
    },
  },
  versions: {
    drafts: {
      schedulePublish: true,
    },
  },
  access: {
    read: anyone,
    update: editor,
    create: editor,
    delete: editor
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
        position: 'sidebar',
      },
    },
    {
      name: 'date',
      type: 'date',
      timezone: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              type: 'checkbox',
              name: 'showBlocks',
            },
            {
              type: 'blocks',
              admin: {
                initCollapsed: true,
                isSortable: false,
                condition: (_, { showBlocks }) => showBlocks,
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
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  admin: {
                    className: 'titleLabel',
                    width: '60%',
                  }
                },
                {
                  name: 'slug',
                  type: 'text',
                  admin: {
                    width: '40%'
                  }
                },
              ],
            },
            {
              name: 'array',
              type: 'array',
              admin: {
                readOnly: true,
              },
              fields: [
                {
                  name: 'arrayText',
                  type: 'text',
                },
              ],
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
              admin: {
                hidden: true
              }
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
            }),
            {
              name: 'canonicalUrl',
              label: 'Canonical URL',
              type: 'text',
              hooks: {
                beforeChange: [
                  async ({ data, value }) => value ? value : `https://example.com/posts/${data?.slug}`,
                ],
              },
            },
            PreviewField({
              hasGenerateFn: true,
            }),
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
          ],
        },
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