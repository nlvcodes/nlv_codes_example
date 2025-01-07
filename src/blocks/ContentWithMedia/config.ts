import { Block } from 'payload'
import { BlocksFeature, HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'

export const ContentWithMedia: Block = {
  slug: 'contentWithMedia',
  interfaceName: 'ContentWithMedia',
  labels: {
    singular: 'Content with Media Block',
    plural: 'Content with Media Blocks',
  },
  // imageURL: 'https://google.com/path/to/image',
  // imageAltText: '',
  fields: [
    {
      type: 'richText',
      name: 'content',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HTMLConverterFeature({})
        ],
      }),
    },
    lexicalHTML('content', {name: 'content_html'}),
    {
      type: 'upload',
      name: 'image',
      relationTo: 'media',
    },
    {
      type: 'radio',
      name: 'textPosition',
      options: ['Left', 'Right'],
    },
  ],
}