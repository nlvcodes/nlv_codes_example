import {Block} from 'payload'

export const ContentWithMedia: Block = {
  slug: 'contentWithMedia',
  labels: {
    singular: 'Content with Media Block',
    plural: 'Content with Media Blocks',
  },
  imageURL: 'https://google.com/path/to/image',
  imageAltText: '',
  fields: [
    {
      type: 'richText',
      name: 'content',
    },
    {
      type: 'upload',
      name: 'image',
      relationTo: 'media'
    },
    {
      type: 'radio',
      name: 'textPosition',
      options: ['Left', 'Right']
    }
  ]
}