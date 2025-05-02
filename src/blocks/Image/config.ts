import {Block} from 'payload'

export const Image: Block = {
  slug: 'image',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}