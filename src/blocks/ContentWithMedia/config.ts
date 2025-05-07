import type { Block } from 'payload'
import { FixedToolbarFeature, lexicalEditor, LinkFeature } from '@payloadcms/richtext-lexical'


export const ContentWithMedia: Block = {
  slug: 'contentWithMedia',
  interfaceName: 'ContentWithMedia',
  admin: {
    group: 'Images',
    disableBlockName: true,
  },
  labels: {
    singular: 'Content with Media Block',
    plural: 'Content with Media Blocks',
  },
  fields: [
    {
      type: 'richText',
      name: 'content',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          // this is the default
          // LinkFeature({disableAutoLinks: undefined}),
          LinkFeature({disableAutoLinks: true}),
          FixedToolbarFeature(),
        ],
      }),
    },
    {
      type: 'upload',
      name: 'image',
      relationTo: 'media',
    },
    {
      type: 'radio',
      name: 'textPosition',
      options: [
        { value: 'Left', label: 'Left' },
        { value: 'Right', label: 'Right' },
      ],
    },
  ],
}
