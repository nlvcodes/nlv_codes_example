import { CollectionConfig } from 'payload'
import { ContentWithMedia } from '@/blocks/ContentWithMedia/config' // previously imported
import {
  BlocksFeature, // imported previously
  FixedToolbarFeature,
  lexicalEditor, // imported previously
  type DefaultNodeTypes, // our types for all the default nodes
  lexicalHTMLField, // the field that will convert and store our lexical content
} from '@payloadcms/richtext-lexical'
import { TableOfContents } from '@/blocks/TableOfContents/config'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { type HTMLConvertersFunction, convertLexicalToHTML } from '@payloadcms/richtext-lexical/html' // this will be how you cast your new lexicalHTMLField to stay type safe
import type { ContentWithMedia as ContentWithMediaProps, Media } from '@/payload-types'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    meta: {
      titleSuffix: 'NLV Codes',
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
      name: 'date',
      type: 'date',
      timezone: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'email',
      type: 'email',
      admin: {
        components: {
          Error: {
            path: 'src/components/Admin/Fields/Error.tsx#Error',
          },
          Cell: {
            path: 'src/components/Admin/Fields/Cell.tsx#EmailCell',
          },
        },
      },
    },
    {
      name: 'list',
      type: 'array',
      admin: {
        components: {
          RowLabel: {
            path: 'src/components/Admin/Fields/Label.tsx#CustomRowLabel',
          },
        },
      },
      fields: [
        {
          type: 'text',
          name: 'listItem',
        },
      ],
      labels: {
        singular: 'list item',
        plural: 'list items',
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: {
        position: 'sidebar',
        className: 'authors',
        components: {
          beforeInput: [
            {
              path: 'src/components/Admin/Fields/Authors.tsx#Authors',
            },
          ],
        },
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  maxLength: 60,
                  admin: {
                    width: '40%',
                    className: 'titleLabel',
                    components: {
                      Description: {
                        path: 'src/components/Admin/Fields/Description.tsx#TitleDescription',
                        clientProps: {
                          defaultLength: 60,
                        },
                      },
                      Cell: {
                        path: 'src/components/Admin/Fields/Cell.tsx#TitleCell',
                      },
                    },
                  },
                },
                {
                  name: 'slug',
                  type: 'text',
                  admin: {
                    width: '60%',
                    // components: {
                    //   Field: {
                    //     path: 'src/components/Admin/Fields/CustomTextField.tsx#CustomTextField',
                    //   },
                    // },
                  },
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
            // we'll need to include the field that will store our converted lexical content
            lexicalHTMLField({
              htmlFieldName: 'content_html', // this is what you want to name your new field
              lexicalFieldName: 'content', // the name of the field we're converting
              hidden: false, // if you want the field to be hidden in the admin UI, false by default
              storeInDB: false, // you can choose whether you want the HTML stored in your database, this is false by default

              // you'll need to provide your block converters, just like we did before.

              //@ts-expect-error
              converters: (({ defaultConverters }) => ({
                ...defaultConverters,
              })) as HTMLConvertersFunction<DefaultNodeTypes>,
            }),
            {
              name: 'plaintext',
              type: 'textarea',
              admin: {
                hidden: true,
              },
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